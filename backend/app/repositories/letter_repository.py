from sqlalchemy.orm import Session

from app.models.letter import Letter


class LetterRepository:
    """
    Database operations for Letter objects.
    """

    def create(
        self,
        db: Session,
        letter: Letter,
    ) -> Letter:
        """
        Create and persist a new letter.
        """

        db.add(letter)
        db.commit()
        db.refresh(letter)

        return letter

    def get_by_id(
        self,
        db: Session,
        letter_id: int,
    ) -> Letter | None:
        """
        Get a letter by its ID.
        """

        return (
            db.query(Letter)
            .filter(Letter.id == letter_id)
            .first()
        )

    def get_by_user(
        self,
        db: Session,
        user_id: int,
    ) -> list[Letter]:
        """
        Get all letters belonging to a user.
        """

        return (
            db.query(Letter)
            .filter(Letter.user_id == user_id)
            .order_by(Letter.created_at.desc())
            .all()
        )

    def delete(
        self,
        db: Session,
        letter: Letter,
    ) -> None:
        """
        Delete a letter.
        """

        db.delete(letter)
        db.commit()