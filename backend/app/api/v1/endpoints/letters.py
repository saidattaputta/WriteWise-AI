from fastapi import APIRouter, HTTPException

from app.core.logging import get_logger
from app.schemas.letter import LetterRequest, LetterResponse

router = APIRouter(
    prefix="/letters",
    tags=["Letters"],
)

logger = get_logger(__name__)


@router.post(
    "/generate",
    response_model=LetterResponse,
)
def generate_letter(request: LetterRequest):
    """
    Generate a simple professional letter.
    """

    logger.info("Letter generation request received.")

    # Example of custom error handling
    if request.tone.lower() == "angry":
        logger.warning("Unsupported tone requested: Angry")

        raise HTTPException(
            status_code=400,
            detail="Angry tone is not supported.",
        )

    # Temporary template (AI integration will come in Phase 3)
    letter = f"""
Dear {request.recipient},

I hope this message finds you well.

I am writing regarding {request.purpose}.

{request.content}

Thank you for your time and consideration.

Sincerely,

WriteWise AI User
"""

    logger.info("Letter generated successfully.")

    return LetterResponse(
        message="Letter generated successfully.",
        letter=letter.strip(),
    )