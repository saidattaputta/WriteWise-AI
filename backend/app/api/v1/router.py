"""
Version 1 API router.
"""

from fastapi import APIRouter

from app.api.v1.endpoints import (
    auth,
    health,
    info,
    letters,
    root,
)

router = APIRouter(
    prefix='/api/v1',
)

router.include_router(root.router)
router.include_router(health.router)
router.include_router(info.router)
router.include_router(letters.router)
router.include_router(auth.router)