"""WriteWise AI API application entry point."""

from fastapi import FastAPI

from app.core.config import settings
from app.core.logging import setup_logging,get_logger

setup_logging()
logger = get_logger(__name__)


app = FastAPI(
    title= settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
    description= 'Backend API for WriteWise AI',
)

@app.get("/")
def root():
    return{
        "message": settings.PROJECT_NAME,
        'status': 'running'
    }

@app.get('/health')
def health_check():
    return{
        'status': 'healthy'
    }