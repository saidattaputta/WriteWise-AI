from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # ----------------------------
    # Project
    # ----------------------------
    PROJECT_NAME: str = "WriteWise AI API"
    PROJECT_VERSION: str = "1.0.0"
    API_V1_PREFIX: str = "/api/v1"
    DEBUG: bool = False

    # ----------------------------
    # Database
    # ----------------------------
    DATABASE_URL: str

    # ----------------------------
    # AI
    # ----------------------------
    AI_PROVIDER: str = "gemini"

    GEMINI_API_KEY: str = ""
    OPENAI_API_KEY: str = ""

    # ----------------------------
    # JWT Authentication
    # ----------------------------
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # ----------------------------
    # Environment
    # ----------------------------
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
    )


settings = Settings()