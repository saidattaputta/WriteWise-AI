import time

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from app.core.logging import get_logger

logger = get_logger(__name__)


def add_middleware(app: FastAPI) -> None:
    """
    Register all middleware.
    """

    # ----------------------------
    # CORS Middleware
    # ----------------------------
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # ----------------------------
    # Request Logging Middleware
    # ----------------------------
    @app.middleware("http")
    async def log_requests(request: Request, call_next):

        start_time = time.time()

        logger.info(
            f"Incoming Request: {request.method} {request.url.path}"
        )

        response = await call_next(request)

        process_time = time.time() - start_time

        logger.info(
            f"Completed {request.method} {request.url.path} "
            f"Status={response.status_code} "
            f"Time={process_time:.4f}s"
        )

        response.headers["X-Process-Time"] = str(process_time)

        return response