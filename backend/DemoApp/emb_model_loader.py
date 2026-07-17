# fastapi_custom_embeddings.py

from typing import List
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
from rich import print
from settings import settings
from fastapi.middleware.cors import CORSMiddleware

# -----------------------------
# Pydantic request/response models
# -----------------------------
class EmbedRequest(BaseModel):
    texts: List[str]


class QueryRequest(BaseModel):
    text: str


class EmbedResponse(BaseModel):
    embeddings: List[List[float]]


class QueryResponse(BaseModel):
    embedding: List[float]


# -----------------------------
# Embedding wrapper
# -----------------------------
class CustomAPIEmbeddings:
    def __init__(self, api_url: str, model_name: str, key: str):
        self.model_name = model_name
        self.api_url = api_url
        self.key = key
        self.embedding_dimension = 384  # all-MiniLM-L6-v2 output size

    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        valid_texts = [text for text in texts if text and text.strip()]
        if not valid_texts:
            return []

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.key}"
        }
        data = {
            "model": self.model_name,
            "input": valid_texts
        }

        try:
            response = requests.post(self.api_url, headers=headers, json=data, verify=False)
            response.raise_for_status()
            api_response_data = response.json()

            if isinstance(api_response_data, dict) and 'data' in api_response_data:
                if not api_response_data['data']:
                    print("[Warning] Embedding API returned an empty 'data' list.")
                    return []
                return [item['embedding'] for item in api_response_data['data']]
            else:
                raise ValueError(f"Unexpected API response format: {api_response_data}")

        except requests.RequestException as e:
            print(f"[Error] Request to embedding API failed: {e}")
            return []
        except ValueError as e:
            print(f"[Error] Failed to parse embedding API response: {e}")
            return []

    def embed_query(self, text: str) -> List[float]:
        embeddings = self.embed_documents([text])
        if embeddings:
            return embeddings[0]

        print(f"[Warning] Could not generate embedding for query: '{text}'. Returning a zero-vector.")
        return [0.0] * self.embedding_dimension


