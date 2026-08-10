from fastapi import APIRouter, HTTPException, Depends

from app.auth.dependencies import get_current_user
from app.models.user import User
from app.core.logging import get_logger
from app.schemas.letter import LetterRequest, LetterResponse
from app.services.ai_service import AIService

router = APIRouter(
    prefix="/letters",
    tags=["Letters"],
)

logger = get_logger(__name__)

service = AIService()


@router.post(
    "/generate",
    response_model=LetterResponse,
    summary="Generate a professional letter",
    description="Generate a professional letter using Gemini AI.",
)
def generate_letter(request: LetterRequest, current_user: User = Depends(get_current_user)):
    """
    Generate a professional letter using the AI service.
    """

    logger.info("Letter generation request received.")

    # Example validation
    if request.tone.lower() == "angry":
        logger.warning(
            "Unsupported tone requested: %s",
            request.tone,
        )

        raise HTTPException(
            status_code=400,
            detail="Angry tone is not supported.",
        )

    try:
        letter = service.generate_letter(request)

        logger.info("Letter generated successfully.")

        return LetterResponse(
            message="Letter generated successfully.",
            letter=letter,
        )

    except Exception as e:
        logger.exception("AI letter generation failed.")

        raise HTTPException(
            status_code=500,
            detail=f"AI generation failed: {str(e)}",
        )