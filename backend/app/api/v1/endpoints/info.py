from fastapi import APIRouter, Depends

from app.dependencies.common import get_app_info
from app.core.logging import get_logger

router = APIRouter(
    prefix="/info",
    tags=["Info"],
)

logger = get_logger(__name__)

@router.get('/')
def get_info(app_info: dict = Depends(get_app_info)):
    logger.info('Application info requested')

    return {
        'message': 'Dependency injection successful',
        'application': app_info,
    }