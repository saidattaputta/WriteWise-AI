from pydantic import BaseModel, Field
from datetime import datetime

class LetterRequest(BaseModel):
    recipient: str = Field(
        ...,
        min_length=2,
        max_length=100,
        description="Recipient of the letter",
        examples=["HR Manager"],
    )

    purpose: str = Field(
        ...,
        min_length=3,
        max_length=100,
        description="Purpose of the letter",
        examples=["Job Application"],
    )

    tone: str = Field(
        ...,
        min_length=3,
        max_length=50,
        description="Tone of the letter",
        examples=["Professional"],
    )

    content: str = Field(
        ...,
        min_length=10,
        description="Main content or context",
        examples=["I am applying for the AI Engineer position."],
    )


class LetterResponse(BaseModel):
    message: str
    letter: str

class LetterHistoryItem(BaseModel):
    id: int
    recipient: str
    purpose: str
    tone: str
    content: str
    generated_content: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True