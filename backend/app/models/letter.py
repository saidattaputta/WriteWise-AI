from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from app.db.database import Base


class Letter(Base):
    __tablename__ = "letters"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        index=True,
    )

    recipient = Column(
        String(100),
        nullable=False,
    )

    purpose = Column(
        String(255),
        nullable=False,
    )

    tone = Column(
        String(50),
        nullable=False,
    )

    content = Column(
        Text,
        nullable=False,
    )

    generated_content = Column(
        Text,
        nullable=False,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    user = relationship(
        "User",
        back_populates="letters",
    )

    def __repr__(self):
        return (
            f"<Letter(id={self.id}, user_id={self.user_id})>"
        )