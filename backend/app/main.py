"""WriteWise AI API application entry point."""

from fastapi import FastAPI

from app.api.api import api_router
from app.core.config import settings
from app.core.logging import setup_logging,get_logger
from app.core.exceptions import add_exception_handlers
from app.core.middleware import add_middleware

setup_logging()
logger = get_logger(__name__)

app = FastAPI(
    title= settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
    description= 'Backend API for WriteWise AI',
)

add_exception_handlers(app)
add_middleware(app)
app.include_router(api_router)

logger.info('WriteWise AI API started sucessfully')
