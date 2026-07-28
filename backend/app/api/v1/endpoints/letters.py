from fastapi import APIRouter

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

    logger.info("Letter generation request received.")

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