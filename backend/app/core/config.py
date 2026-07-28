from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = 'WriteWise AI API'
    PROJECT_VERSION: str = '1.0.0'
    API_V1_PREFIX: str = '/api/v1'
    DEBUG: bool = False

    model_config = SettingsConfigDict(
        env_file= '.env', 
        env_file_encoding= 'utf-8',
        case_sensitive= True,
    )

settings = Settings()
