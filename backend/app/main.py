"""WriteWise AI API application entry point."""

from fastapi import FastAPI

from app.api.api import api_router


app = FastAPI(
    title="WriteWise AI API",
    version="1.0.0",
    description="Backend API for WriteWise AI.",
)

app.include_router(api_router)


@app.get("/", tags=["system"])
async def root() -> dict[str, str]:
    """Return the API service status."""
    return {"message": "WriteWise AI API", "status": "running"}


@app.get("/health", tags=["system"])
async def health() -> dict[str, str]:
    """Return the API health status."""
    return {"status": "healthy"}
