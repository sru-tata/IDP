import os
import re
import argparse
import numpy as np
import math
from pymilvus import connections, Collection, CollectionSchema, FieldSchema, DataType, utility
from typing import List, Dict
from settings import settings
from pymilvus import db
from emb_model_loader import CustomAPIEmbeddings

embedding_url = f"{settings.allMini_emb_api}"
emb_model_obj = CustomAPIEmbeddings(
    api_url=embedding_url,
    model_name=settings.model_name_emb,
    key=settings.openai_api_key
)

# ---- Embedding placeholder (replace with real OpenAI/HF call) ----
def embed_texts(texts: List[str]) -> List[List[float]]:
    """Dummy embedding generator: replace with OpenAI embeddings or sentence transformers."""
    return emb_model_obj.embed_documents(texts)


# ---- Helpers ----


def chunk_for_nodes(doc: str) -> List[str]:
    """
    Split the document into pages using '--- Page X ---' as a divider.
    Returns a list of strings, each containing all content of that page.
    """
    # Split the document on page dividers
    chunks = re.split(r'--- Page \d+ ---', doc)

    # Remove empty/whitespace chunks
    chunks = [chunk.strip() for chunk in chunks if chunk.strip()]

    # Keep the first line as header (like failure_mode) or full page content
    formatted_chunks = []
    for chunk in chunks:
        lines = chunk.split("\n")
        header = lines[0].strip()  # First line of page
        content = chunk  # Full page content
        formatted_chunks.append(content)  # Return full page content as single chunk

    return formatted_chunks


def ensure_collection(collection_name, embed_dim, metric, nlist):
    """Create Milvus collection with schema + index."""
    
    db_name = settings.vector_db_name
    user = settings.milvus_user
    password = settings.milvus_password
    port = settings.milvus_port
    print("settings.vector_db_name---->",settings.vector_db_name)
    print("settings.milvus_base---->",settings.milvus_base)
    print("settings.milvus_port---->",settings.milvus_port)
    print("settings.vector_db_name---->",settings.vector_db_name)
    print("collection_name---->",collection_name)
    connections.connect(alias="default",db_name=db_name, host="172.22.95.31", port=port,user=user,password=password)
    # if settings.vector_db_name not in [d.name for d in db.list_database()]:
        # db.create_database(settings.vector_db_name)
    # db.using_database(settings.vector_db_name)
    if utility.has_collection(collection_name):
        print(f"Dropping existing collection: {collection_name}")
        utility.drop_collection(collection_name)

    fields = [
        FieldSchema(name="doc_id", dtype=DataType.INT64, is_primary=True, auto_id=False),
        FieldSchema(name="text", dtype=DataType.VARCHAR, max_length=4000),
        FieldSchema(name="vector", dtype=DataType.FLOAT_VECTOR, dim=embed_dim),
    ]
    schema = CollectionSchema(fields, description="Vehicle Fixer Failure Modes")

    col = Collection(collection_name, schema=schema)

    index_params = {
        "index_type": "IVF_FLAT",
        "metric_type": metric,
        "params": {"nlist": nlist},
    }
    col.create_index(field_name="vector", index_params=index_params)
    return col

def clean_text(text):
    # Replace problematic unicode characters
    text = text.replace("\uf0b4", "-")  # bullets
    text = text.replace("·", "-")       # middle dot
    text = text.replace("\xa0", " ")    # non-breaking space
    text = re.sub(r"[^\x00-\x7F]+", " ", text)  # remove other non-ASCII chars
    text = text.strip()
    return text

MAX_CHARS = 800  # safe limit for embedding API

def split_large_chunks(chunks):
    small_chunks = []
    for chunk in chunks:
        chunk = clean_text(chunk)
        if len(chunk) <= MAX_CHARS:
            small_chunks.append(chunk)
        else:
            lines = chunk.split("\n")
            temp = ""
            for line in lines:
                if len(temp) + len(line) + 1 > MAX_CHARS:
                    small_chunks.append(temp.strip())
                    temp = line
                else:
                    temp += "\n" + line
            if temp.strip():
                small_chunks.append(temp.strip())
    return small_chunks

def ingest_text_to_milvus(file_path, collection_name, embed_dim, metric, nlist, batch_size=5):
    """Main ingestion pipeline with safe batching and error handling."""
    
    # 1️⃣ Ensure collection exists
    col = ensure_collection(collection_name, embed_dim, metric, nlist)

    # 2️⃣ Load raw document
    if file_path.endswith(".pdf"):
        reader = PdfReader(file_path)
        doc = "\n".join([page.extract_text() for page in reader.pages if page.extract_text()])
    else:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            doc = f.read()

    if not doc.strip():
        raise RuntimeError("No text found in the input file.")

    # 3️⃣ Split + format
    formatted_chunks = chunk_for_nodes(doc)
    
    print(f"Extracted {len(formatted_chunks)} chunks.")

    print("Chunks: ",formatted_chunks)
    formatted_chunks = split_large_chunks(formatted_chunks)
    print(f"Extracted cleaned{len(formatted_chunks)} chunks.")

    if not formatted_chunks:
        raise RuntimeError("No extractable text found after chunking.")

    # Optional: clean bullets/unicode if API fails
    formatted_chunks = [re.sub(r'[\uf0b4]', '-', c) for c in formatted_chunks]
    print("Chunks: ",formatted_chunks)
    print("len of formatted_chunks: ",len(formatted_chunks))

    # 4️⃣ Embed in batches
    all_vectors = []
    all_chunks = []
    num_batches = math.ceil(len(formatted_chunks) / batch_size)
    print("num_batches: ",num_batches)

    for i in range(num_batches):
        batch = formatted_chunks[i*batch_size:(i+1)*batch_size]
        print("len(batch): ",len(batch))
        vectors = embed_texts(batch)
        print("len(vectors): ",len(vectors))

        if len(vectors) != len(batch):
            print(f"[Warning] Some chunks failed to embed in batch {i+1}: {len(batch) - len(vectors)} skipped")
            # Only keep successfully embedded chunks
            batch = [c for c, v in zip(batch, vectors) if v]
            vectors = [v for v in vectors if v]

        all_chunks.extend(batch)
        all_vectors.extend(vectors)

    if not all_vectors:
        raise RuntimeError("No embeddings were successfully generated.")

    # 5️⃣ Insert into Milvus
    ids = list(range(1, len(all_chunks)+1))
    mr = col.insert([ids, all_chunks, all_vectors])
    col.flush()
    print(f"Inserted {len(all_chunks)} chunks into Milvus.")

    # 6️⃣ Load collection into memory
    col.load()
    print("Collection loaded into memory.")



if __name__ == "__main__":
    import glob

    # Automatically pick all .txt files in current directory
    files = glob.glob("*.txt")

    if not files:
        print("❌ No .txt or .pdf files found in current directory.")
        exit(1)

    print(f"Found {len(files)} files: {files}")

    embed_dim = 384  # default embedding dimension
    metric = "L2"    # default metric
    nlist = 128      # default nlist

    for file_path in files:
        print(f"\n📄 Processing file: {file_path}")
        try:
            ingest_text_to_milvus(
                file_path=file_path,
                collection_name=settings.collection_name,
                embed_dim=embed_dim,
                metric=metric,
                nlist=nlist,
            )
        except Exception as e:
            print(f"⚠️ Failed to process {file_path}: {e}")
