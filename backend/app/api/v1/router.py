"""Version 1 API router.

Endpoint routers will be registered here as the API is implemented.
"""

from fastapi import APIRouter
from app.api.v1.endpoints import (
    health,
    root,
    letters,
    info,
)

router = APIRouter()

router.include_router(root.router)
router.include_router(health.router)
router.include_router(letters.router)
router.include_router(info.router)