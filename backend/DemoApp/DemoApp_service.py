import logging
import asyncio
import json
import httpx
import os
from typing import List, Dict, AsyncGenerator, Optional, Tuple
from openai import OpenAI
from settings import settings
from emb_model_loader import CustomAPIEmbeddings
from prompts.prompt_manager import PromptEngine
logger = logging.getLogger(__name__)

# --- RAG and Model Setup ---
openai_api_base = settings.openai_api_base
embedding_url = f"{settings.allMini_emb_api}"
emb_model_obj = CustomAPIEmbeddings(
    api_url=embedding_url,
    model_name=settings.model_name_emb,
    key=settings.openai_api_key
)

# Initialize the OpenAI client with the custom httpx client
httpx_client = httpx.Client(verify=False)
model = settings.model_name_llm
openai_client = OpenAI(
    api_key=settings.openai_api_key,
    http_client=httpx_client,
    base_url=settings.openai_api_base
)

# --- Constants ---
SYSTEM_PROMPT = """You are a helpful AI assistant. Provide concise and accurate answers based on the conversation history."""
TITLE_GENERATION_PROMPT = """Based on the following conversation, generate a short, concise title (4-5 words max).
Do not use any quotation marks or labels in your response. Just provide the title text.

CONVERSATION:
{conversation_text}
"""
HISTORY_LENGTH = 10
LLAMA_ENDPOINT_URL = f"{openai_api_base}/chat/completions"

async def _query_from_db(user_query: str, top_k: int = 3) -> list[str]:
    payload = {
        "query": user_query,
        'openai_api_key': settings.openai_api_key,
        'model_name_emb': settings.model_name_emb,
        'vector_db_name': settings.vector_db_name,
        'collection_name': settings.collection_name,
        'milvus_user': settings.milvus_user,
        'milvus_password': settings.milvus_password
    }
    headers = {"Content-Type": "application/json"}

    async with httpx.AsyncClient() as client:
        response = await client.post(settings.retrieval_api, json=payload, headers=headers)
    result = response.json()

    docs = []

    # Prefer reranked_nodes if present
    if "reranked_nodes" in result and isinstance(result["reranked_nodes"], list):
        docs = [
            node.get("document", {}).get("text", "")
            for node in result["reranked_nodes"][:top_k]
        ]
    # Else fall back to retrieved_nodes
    elif "retrieved_nodes" in result and isinstance(result["retrieved_nodes"], list):
        docs = result["retrieved_nodes"][:top_k]

    return docs  

async def _get_prompt(instruction: str) -> str:
    db_response = await _query_from_db(instruction)
    if db_response:
        engine = PromptEngine("prompts/prompts.yaml")

        out1, merged_inputs1 = engine.render(
            template_name="generic_chatbot",
            template_key="TEMPLATE_1",
            runtime_inputs={"db_response": db_response}
        )
        return out1
    else:
        return "Not available"

# Helper Function to Stream Response Chunks 
async def _stream_response_httpx(
    endpoint_url: str, api_key: str, model: str, messages: List[Dict[str, str]], **kwargs
) -> AsyncGenerator[Tuple[Optional[str], Optional[str]], None]:
    stream_id = asyncio.current_task().get_name() if asyncio.current_task() else 'unknown_stream'
    logger.info(f"[{stream_id}] Starting HTTPX stream. Endpoint: {endpoint_url}, Model: {model}")
    payload = { "model": model, "messages": messages, "stream": True, **kwargs }
    headers = {"Content-Type": "application/json", "Accept": "text/event-stream"}
    if api_key and api_key != "EMPTY":
         headers["Authorization"] = f"Bearer {api_key}"
    chunk_count = 0
    try:
        async with httpx.AsyncClient(timeout=None, verify=False) as client:
            async with client.stream("POST", endpoint_url, json=payload, headers=headers) as response:
                logger.info(f"[{stream_id}] HTTPX stream request status: {response.status_code}")
                if response.status_code >= 400:
                     error_body = await response.aread()
                     err_msg = f"LLM API Error ({response.status_code}): Check logs."
                     logger.error(f"[{stream_id}] HTTPX Error Status {response.status_code}: {error_body.decode()}")
                     yield None, err_msg
                     return
                async for line in response.aiter_lines():
                    if line.startswith("data:"):
                        data_json = line[len("data:"):].strip()
                        if data_json == "[DONE]":
                            logger.info(f"[{stream_id}] Received [DONE] marker.")
                            break
                        try:
                            item = json.loads(data_json)
                            choices = item.get("choices")
                            if choices and isinstance(choices, list) and len(choices) > 0:
                                content = choices[0].get("delta", {}).get("content")
                                if content:
                                     chunk_count += 1
                                     logger.debug(f"[{stream_id}] Yielding chunk {chunk_count}: '{content}'")
                                     yield content, None
                        except json.JSONDecodeError:
                             logger.warning(f"[{stream_id}] Failed to decode JSON data line: {data_json}")
                             yield None, "Failed to decode LLM stream data."
                        except Exception as parse_exc:
                            logger.error(f"[{stream_id}] Error processing stream item: {parse_exc} | Data: {data_json}", exc_info=True)
                            yield None, f"Error processing LLM stream: {parse_exc}"
        logger.info(f"[{stream_id}] HTTPX stream finished processing. Yielded {chunk_count} chunks.")
    except httpx.RequestError as e:
        logger.error(f"[{stream_id}] HTTPX Request Error connecting to {endpoint_url}: {e}", exc_info=True)
        yield None, f"Network Error connecting to LLM: {e}"
    except Exception as e:
        logger.error(f"[{stream_id}] Generic Error during HTTPX streaming: {e}", exc_info=True)
        yield None, f"Error during AI generation processing: {e}"

async def stream_llama_chat_completion_ws(text: str, history: List[Dict[str, str]]) -> AsyncGenerator[Tuple[Optional[str], Optional[str]], None]:
    logger.info(f"Initiating Standard Llama WS completion for text: '{text[:50]}...'")
    model_to_use = model
    
    # SYSTEM_PROMPT = await _get_prompt(text)       #-----> use this if you want to use milvus VDB else comment this line and use default system prompt initialised at start
    
    messages_to_send = history[-(HISTORY_LENGTH * 2):]
    if messages_to_send and messages_to_send[0]['role'] == 'assistant': messages_to_send.pop(0)
    message_payload = [{"role": "system", "content": SYSTEM_PROMPT}] + messages_to_send
    if not message_payload or message_payload[-1].get('content') != text or message_payload[-1].get('role') != 'user':
        message_payload.append({"role": "user", "content": text})
    logger.debug(f"Llama WS (HTTPX): Sending payload with {len(message_payload)} messages.")
    async for chunk, error in _stream_response_httpx(
        endpoint_url=LLAMA_ENDPOINT_URL, api_key=settings.openai_api_key, model=model_to_use,
        messages=message_payload, temperature=0.6, stop=["<|eot_id|>", "<|end_header_id|>"]
    ): 
        yield chunk, error

async def generate_chat_title(messages_for_title_generation: List[Dict[str, str]]) -> Optional[str]:
    if not messages_for_title_generation:
        return None
    logger.info(f"Generating chat title for a conversation with {len(messages_for_title_generation)} messages.")
    conversation_summary = "\n".join(
        f"{msg['role']}: {msg['content']}" for msg in messages_for_title_generation
    )
    prompt = TITLE_GENERATION_PROMPT.format(conversation_text=conversation_summary)
    try:
        completion = await asyncio.to_thread(
            openai_client.chat.completions.create,
            model=model,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.2, max_tokens=20, stream=False, stop=["\n"]
        )
        title = completion.choices[0].message.content.strip().strip('\'"')
        if title:
            logger.info(f"Successfully generated chat title: '{title}'")
            return title
        else:
            logger.warning("Title generation resulted in an empty string.")
            return None
    except Exception as e:
        logger.error(f"Failed to generate chat title: {e}", exc_info=True)
        return None