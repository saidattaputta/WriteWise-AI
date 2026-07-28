from fastapi import APIRouter
from app.core.logging import get_logger

router = APIRouter()

logger = get_logger(__name__)

@router.get('/health')
def get_health():
    logger.info('Health endpoint accessed')
    return{
        'status': 'healthy'
    }