"""Version 1 API router.

Endpoint routers will be registered here as the API is implemented.
"""

from fastapi import APIRouter
from app.api.v1.endpoints import root,health

router = APIRouter()

router.include_router(root.router)
router.include_router(health.router)
