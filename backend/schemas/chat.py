import uuid
from datetime import datetime
from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, description="User message text")


class ChatResponse(BaseModel):
    response: str
    conversation_id: uuid.UUID


class MessageResponse(BaseModel):
    id: uuid.UUID
    role: str
    content: str
    created_at: datetime


class ConversationResponse(BaseModel):
    conversation_id: uuid.UUID
    messages: list[MessageResponse]
