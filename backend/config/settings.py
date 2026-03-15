import os
from pathlib import Path

from pydantic_settings import BaseSettings
from dotenv import load_dotenv

# Resolve .env relative to the backend/ directory (parent of config/)
_backend_dir = Path(__file__).resolve().parent.parent
_env_path = _backend_dir / ".env"

load_dotenv(_env_path)


class Settings(BaseSettings):
    DATABASE_URL: str
    # Accept the key under either name; GOOGLE_API_KEY takes priority.
    # Set one of them in backend/.env or as an OS environment variable.
    GOOGLE_API_KEY: str = ""
    GEMINI_API_KEY: str = ""
    JWT_SECRET: str = "dev-secret-change-in-production"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRATION_HOURS: int = 24

    @property
    def google_api_key(self) -> str:
        """Return the active Gemini/Google API key (GOOGLE_API_KEY preferred)."""
        return self.GOOGLE_API_KEY or self.GEMINI_API_KEY

    class Config:
        env_file = str(_env_path)


settings = Settings()
