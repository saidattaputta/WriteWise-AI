from fastapi import APIRouter
from app.core.config import settings
from app.core.logging import get_logger

router = APIRouter(tags=['Root'])

logger = get_logger(__name__)

@router.get('/')
def get_root():
    logger.info('Root Endpoint accessed')
    return{
            "message": settings.PROJECT_NAME,
            'status': 'running'
        }

