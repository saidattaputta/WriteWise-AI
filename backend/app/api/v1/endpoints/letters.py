from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.core.logging import get_logger
from app.db.database import get_db
from app.models.letter import Letter
from app.models.user import User
from app.repositories.letter_repository import LetterRepository
from app.schemas.letter import LetterRequest, LetterResponse
from app.services.ai_service import AIService


router = APIRouter(
    prefix="/letters",
    tags=["Letters"],
)

logger = get_logger(__name__)

service = AIService()
repository = LetterRepository()


@router.post(
    "/generate",
    response_model=LetterResponse,
    summary="Generate a professional letter",
    description="Generate a professional letter using Gemini AI.",
)
def generate_letter(
    request: LetterRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Generate a letter using AI and save it
    for the authenticated user.
    """

    logger.info(
        "Letter generation request received for user=%s",
        current_user.email,
    )

    # Validate tone
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
        # Generate letter using AI
        generated_letter = service.generate_letter(request)

        logger.info(
            "Letter generated successfully for user=%s",
            current_user.email,
        )

        # Create database record
        letter = Letter(
            user_id=current_user.id,
            recipient=request.recipient,
            purpose=request.purpose,
            tone=request.tone,
            content=request.content,
            generated_content=generated_letter,
        )

        # Save letter
        saved_letter = repository.create(
            db=db,
            letter=letter,
        )

        logger.info(
            "Letter saved successfully with id=%s",
            saved_letter.id,
        )

        return LetterResponse(
            message="Letter generated successfully.",
            letter=generated_letter,
        )

    except HTTPException:
        raise

    except Exception as e:
        logger.exception(
            "AI letter generation failed."
        )

        raise HTTPException(
            status_code=500,
            detail=f"AI generation failed: {str(e)}",
        )