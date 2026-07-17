# settings.py

from pydantic_settings import BaseSettings
from urllib.parse import quote_plus


class Settings(BaseSettings):
    ENV: str = "dev" 
    # Base URL for your custom embedding backend
    allMini_emb_api: str = "https://neuroverse.tatamotors.com/monitoring_v2/v1/embeddings" 
    model_name_emb: str = "neuroverse-all-MiniLM-L6-v2"


    # LLM configuration
    model_name_llm: str = "neuroverse-meta-llama--Llama-3.1-8B-Instruct"
    router_model_name:str = "neuroverse-gpt-oss-120b"
    vision_model_name:str = "neuroverse-Qwen2.5-VL-72B-Instruct"
    code_model_name:str = "neuroverse-gpt-oss-120b"
    openai_api_base: str ="https://neuroverse.tatamotors.com/monitoring_v2/v1"
    openai_api_key: str = "sk-Ev4x7K370ieEsT-dJ6pDJg"       
    
    
    # Milvus configuration
    milvus_base:str = "http://172.22.95.31"
    milvus_port:str = "19530"
    milvus_user:str = "IDP_Platform_Admin"
    milvus_password:str = "Srujan-S6L9Q4-milvus@neuroverse"
    milvus_token:str = "IDP_Platform_Admin:Srujan-S6L9Q4-milvus@neuroverse"   # user:password token form, for clients that prefer token auth
    vector_db_name:str = "IDP_Platform_DB"
    collection_name:str = "idp_learning_content_embeddings"
    retrieval_api:str ="http://172.22.95.31:8537/retrieve_milvus"

    
    STT_API_URL:str = "https://neuroverse.tatamotors.com/code-stt/transcribe_audio"
    TTS_API_URL:str = "https://neuroverse.tatamotors.com/code-tts/text_to_speech"


    ## Mongo Conversation Logging 
    mongo_username:str = "IDP_Platform_DB_Admin"
    mongo_password:str = "srujan-S6L9Q4-mongo@neuroverse"
    encoded_password:str = quote_plus(mongo_password)
    MONGO_HOST: str = "172.22.95.31"
    MONGO_PORT: int = 27017
    DB_NAME_DEV:str = "IDP_Platform_DB"  
    DB_NAME_PROD:str = "IDP_Platform_DB"
    MONGO_COLLECTION_NAME:str ="idp_conversation_logs"
    APP_NAME:str = "DemoApp"      


    class Config:
        env_file = ".env"   # pydantic-settings will read the env-file passed by docker compose
        env_file_encoding = "utf-8"

    @property
    def DB_NAME(self) -> str:
        """Return DB name depending on ENV (dev or prod)."""
        env = (self.ENV or "dev").strip().lower()
        if env in ("prod", "production"):
            return self.DB_NAME_PROD
        return self.DB_NAME_DEV

    @property
    def MONGO_URI(self) -> str:
        """Build Mongo URI dynamically using the selected DB_NAME."""
        pwd = quote_plus(self.mongo_password or "")
        host_port = f"{self.MONGO_HOST}:{self.MONGO_PORT}"
        return f"mongodb://{self.mongo_username}:{pwd}@{host_port}/{self.DB_NAME}?authSource={self.DB_NAME}"


# single shared settings instance
settings = Settings() 