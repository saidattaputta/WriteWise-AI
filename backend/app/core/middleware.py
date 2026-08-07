import time

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from app.core.logging import get_logger

logger = get_logger(__name__)


def add_middleware(app: FastAPI) -> None:
    """
    Register application middleware.
    """

    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "http://localhost:5173",
            "http://127.0.0.1:5173",
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.middleware("http")
    async def log_requests(request: Request, call_next):

        start_time = time.time()

        logger.info(
            "Incoming Request: %s %s",
            request.method,
            request.url.path,
        )

        try:
            response = await call_next(request)

        except Exception:
            logger.exception("Unhandled exception")
            raise

        process_time = time.time() - start_time

        logger.info(
            "Completed %s %s | Status=%s | Time=%.4fs",
            request.method,
            request.url.path,
            response.status_code,
            process_time,
        )

        response.headers["X-Process-Time"] = f"{process_time:.4f}"

        return response