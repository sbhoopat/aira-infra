import os
from typing import List
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "Aira Infra Real Estate Backend"
    VERSION: str = "1.0.0"
    SUPABASE_PROJECT_ID: str = os.getenv("SUPABASE_PROJECT_ID", "emdvemarpmkpogifxjyj")
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", f"https://{SUPABASE_PROJECT_ID}.supabase.co")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
    SUPABASE_SERVICE_ROLE_KEY: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
    JWT_SECRET: str = os.getenv("JWT_SECRET", "aira_infra_super_secret_jwt_key_2026")
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
    JWT_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))
    CORS_ORIGINS: List[str] = [
        origin.strip() 
        for origin in os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000").split(",")
        if origin.strip()
    ]

settings = Settings()
