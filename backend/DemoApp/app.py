##app.py
import json, logging,uuid, os, shutil,asyncio, httpx, base64, requests
from datetime import datetime, timezone
from typing import Dict, List, Optional, Any
from pathlib import Path
from settings import settings

from fastapi import (
    APIRouter,
    WebSocket,
    WebSocketDisconnect,
    Query,
    HTTPException,
    status,
    UploadFile,
    File,
    Form,
    Request,
    Response
)
from fastapi.responses import JSONResponse
from fastapi import FastAPI, APIRouter, WebSocket, WebSocketDisconnect, Query, status
from fastapi.middleware.cors import CORSMiddleware

from DemoApp_service import (
    stream_llama_chat_completion_ws,
    HISTORY_LENGTH,
    generate_chat_title
)
from db_manager import (
    get_user_thread_list, 
    get_thread_by_id, 
    create_thread_in_db, 
    update_thread_field,
    add_turn_to_chat, 
    update_feedback_in_chat,
    format_timestamp_to_ist_str,
    get_current_ist_datetime,
    mark_thread_as_deleted,
    rename_thread_title,
    COLLECTION_NAME as COLLECTION
)

import inspect

from idp.routes import router as idp_router

background_tasks: List[asyncio.Task] = []

##dummy to skip login page
session_id = "4654656565"
active_sessions: dict[str, dict] = {}

active_sessions[session_id] = {
    "user_id": "987456321", "username": 'dummy_user.ttl',
    "full_name": 'Dummy User', "domain": "tmindia"
}
logger = logging.getLogger(__name__)

router = APIRouter(
    prefix = "/" + settings.APP_NAME,
    tags=["DemoApp_template"]
)
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(idp_router)

logger.info("Demo App service now uses a domain-driven, separated MongoDB schema.")

STT_API_URL = settings.STT_API_URL
TTS_API_URL = settings.TTS_API_URL

MIN_TURNS_FOR_AUTO_TITLE = 2

async def attempt_title_generation_and_notify(user_id_local: str, thread_id_local: str, websocket_local: Optional[WebSocket]):
    thread_data = get_thread_by_id(thread_id_local, user_id_local, COLLECTION)
    messages_for_title = []
    if thread_data:
        active_source = next((s for s in thread_data.get("sources", []) if s.get("main_chat_messages")), None)
        if active_source:
            messages_for_title = active_source.get("main_chat_messages", [])
        else:
            messages_for_title = thread_data.get("messages", [])

    if not thread_data or thread_data.get("title_generated", False) or len(messages_for_title) < (MIN_TURNS_FOR_AUTO_TITLE * 2):
        return

    logger.info(f"TitleGenTask: Attempting to generate title for thread {thread_id_local}.")
    new_title = await generate_chat_title(messages_for_title)

    if new_title and new_title.strip():
        updates = {"title": new_title.strip(), "title_generated": True}
        update_thread_field(thread_id_local, COLLECTION, updates)
        if websocket_local and websocket_local.client_state == websocket_local.client_state.CONNECTED:
            try:
                await websocket_local.send_json({ "type": "thread_title_updated", "thread_id": thread_id_local, "new_title": new_title.strip() })
            except Exception as e:
                logger.error(f"TitleGenTask: Error sending title update: {e}")
    else:
        update_thread_field(thread_id_local, COLLECTION, {"title_generated": True})

@app.post("/transcribe_audio")
async def transcribe_audio(
    session_id: str = Form(...),
    audio: UploadFile = File(...)
):
    try:
        audio_bytes = await audio.read()
        async with httpx.AsyncClient(timeout=100, verify=False) as client:
            response = await client.post(
                f"{STT_API_URL}",
                data={"session_id": session_id},
                files={"audio": (audio.filename, 
                                audio_bytes, 
                                audio.content_type
                                )},
            )
        response.raise_for_status()
        return JSONResponse(content=response.json())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"STT proxy failed: {e}")

@app.post("/text_to_speech")
async def text_to_speech(request: dict):
    try:
        async with httpx.AsyncClient(timeout=100, verify=False) as client:
            response = await client.post(
                f"{TTS_API_URL}",
                json=request,
            )
        response.raise_for_status()
        return JSONResponse(content=response.json())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"TTS proxy failed: {e}")

async def stream_and_save_response(
    websocket: WebSocket, 
               user_id: str, 
               thread_id: str, 
               user_input: str, 
               client_msg_id: str, 
               active_source_ids: Optional[List[str]]
):
    source_ids = active_source_ids or []
    thread_data = get_thread_by_id(thread_id, user_id, COLLECTION)
    if not thread_data:
        await websocket.send_json({"type": "error", "content": "Thread not found."}); return

    history_for_llm = []
    completion_generator = None

    history_for_llm = thread_data.get("messages", [])
    completion_generator = stream_llama_chat_completion_ws(user_input, [{"role": m["role"], "content": m["content"]} for m in history_for_llm[-(HISTORY_LENGTH * 2):]])

    if not completion_generator:
        await websocket.send_json({"type": "error", "content": "Could not initialize AI model.", "source_ids": source_ids}); return

    full_bot_response, stream_successful = "", True
    bot_client_msg_id, bot_backend_msg_id = f"bot_client_{uuid.uuid4()}", f"bot_backend_{uuid.uuid4()}"

    try:
        first_chunk = True
        async for chunk, error in completion_generator:

            if error:
                stream_successful = False
                await websocket.send_json({"type": "error", "content": error, "source_ids": source_ids})
                break

            if chunk:
                full_bot_response += chunk
                payload = {"type": "content", "content": chunk, "thread_id": thread_id, "source_ids": source_ids}
                if first_chunk:
                    payload.update({"client_message_id": bot_client_msg_id, "backend_message_id": bot_backend_msg_id})
                    first_chunk = False
                await websocket.send_json(payload)

        await websocket.send_json({"type": "stream_end", "thread_id": thread_id, "client_message_id": bot_client_msg_id, "source_ids": source_ids})

    except asyncio.CancelledError:
        stream_successful = False
        await websocket.send_json({"type": "stream_end", "cancelled": True})
        raise

    except Exception as e:
        stream_successful = False
        logger.error(f"Stream error: {e}", exc_info=True)

    finally:
        if stream_successful and full_bot_response:
            now_ist = get_current_ist_datetime()
            new_turn = {
                "user_query": user_input, "user_timestamp": now_ist,
                "user_client_id": client_msg_id, "user_backend_id": f"user_backend_{uuid.uuid4()}",
                "assistant_response": full_bot_response, "assistant_timestamp": now_ist,
                "assistant_client_id": bot_client_msg_id, "assistant_backend_id": bot_backend_msg_id, "feedback": None
            }
            add_turn_to_chat(thread_id, COLLECTION, new_turn)

            task = asyncio.create_task(
            attempt_title_generation_and_notify(user_id, thread_id, websocket)
        )
        background_tasks.append(task)

@app.websocket("/health")
async def test_ws(ws: WebSocket):
    await ws.accept()
    await ws.send_text("hello")
    await ws.close()

@app.websocket("/ws")
async def websocket_endpoint(
    websocket: WebSocket,
    session_id: Optional[str] = Query(None, alias="session_id")
):
    await validate_and_accept_websocket(websocket, session_id)

    user_id = active_sessions[session_id]["user_id"]
    active_generation_task: Optional[asyncio.Task] = None

    try:
        # Send user's thread list
        await send_thread_list(websocket, user_id)

        while True:
            message_data = await receive_json_message(websocket)
            msg_type = message_data.get("type")

            handler = MESSAGE_HANDLERS.get(msg_type)
            if not handler:
                await websocket.send_json({
                    "type": "error",
                     "content": f"Unsupported message type: {msg_type}",
                     "original": message_data
                })
                continue
            
            # Cancel active generation where needed
            if msg_type in CANCEL_TASK_ON:
                active_generation_task = cancel_active_task(active_generation_task)

            if inspect.iscoroutinefunction(handler):
                result_task = await handler(websocket, user_id, message_data)
            else:
                result_task = handler(websocket, user_id, message_data)


            if result_task:
                active_generation_task = result_task

    except WebSocketDisconnect:
        logger.info(f"WebSocket disconnected for {user_id}")

    except Exception as e:
        logger.error(f"Unhandled WS exception for {user_id}: {e}", exc_info=True)

    finally:
        cancel_active_task(active_generation_task)
        logger.info(f"WebSocket connection closed for {user_id}")

async def validate_and_accept_websocket(websocket: WebSocket, session_id: Optional[str]):
    if not session_id or session_id not in active_sessions:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        raise RuntimeError("Invalid session_id provided")

    await websocket.accept()

async def send_thread_list(websocket: WebSocket, user_id: str):
    threads = get_user_thread_list(user_id, COLLECTION)
    await websocket.send_json({"type": "history_list", "threads": threads})

async def receive_json_message(websocket: WebSocket) -> dict:
    data = await websocket.receive_text()
    return json.loads(data)

def cancel_active_task(task: Optional[asyncio.Task]):
    if task and not task.done():
        task.cancel()
    return None

async def handle_create_thread(websocket, user_id, _):
    new_id = str(uuid.uuid4())
    now = get_current_ist_datetime()
    timestamp = format_timestamp_to_ist_str(now)

    new_doc = {
        "id": new_id,
        "user_id": user_id,
        "title": "New Chat",
        "application_name": "Demo App",
        "messages": [],
        "created_at": timestamp,
        "last_updated": timestamp,
        "updated_at": timestamp,
        "title_generated": False,
        "chat_deleted": False
    }

    create_thread_in_db(new_doc, COLLECTION)

    await websocket.send_json({
        "type": "new_thread_created",
        "thread_id": new_id,
        "title": "New Chat"
    })

async def handle_load_thread(websocket, user_id, data):
    thread_id = data.get("thread_id")
    if not thread_id:
        return

    thread_data = get_thread_by_id(thread_id, user_id, COLLECTION)
    if not thread_data:
        await websocket.send_json({"type": "error", "content": "Thread not found"})
        return

    payload = dict(thread_data)
    payload["type"] = "thread_content"
    payload["thread_id"] = thread_id

    await websocket.send_json(payload)

async def handle_delete_thread(websocket, user_id, data):
    thread_id = data.get("thread_id")
    if thread_id:
        mark_thread_as_deleted(thread_id, COLLECTION)

        await websocket.send_json({
            "type": "thread_deleted",
            "thread_id": thread_id
        })

async def handle_rename_thread(websocket, user_id, data):
    thread_id = data.get("thread_id")
    new_title = data.get("new_title")

    if thread_id and new_title:
        rename_thread_title(thread_id, COLLECTION, new_title)

        await websocket.send_json({
            "type": "thread_title_updated",
            "thread_id": thread_id,
            "new_title": new_title
        })
def handle_send_message(websocket, user_id, data):
    user_input = data.get("user_input")
    thread_id = data.get("thread_id")
    client_msg_id = data.get("client_message_id")
    active_source_ids = data.get("active_source_ids")

    if not all([user_input, thread_id, client_msg_id]):
        return None

    task = asyncio.create_task(
        stream_and_save_response(
            websocket,
            user_id,
            thread_id,
            user_input,
            client_msg_id,
            active_source_ids
        )
    )
    background_tasks.append(task)
    return task

def handle_message_feedback(websocket, user_id, data):
    thread_id = data.get("thread_id")
    msg_id = data.get("message_id")
    feedback = data.get("feedback")

    if thread_id and msg_id:
        update_feedback_in_chat(thread_id, COLLECTION, msg_id, feedback)

MESSAGE_HANDLERS = {
    "create_new_thread": handle_create_thread,
    "load_thread": handle_load_thread,
    "delete_thread": handle_delete_thread,
    "rename_thread": handle_rename_thread,
    "send_message": handle_send_message,
    "message_feedback": handle_message_feedback,
}

CANCEL_TASK_ON = {
    "create_new_thread",
    "load_thread",
    "send_message"
}



