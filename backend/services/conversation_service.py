import uuid
from datetime import datetime, timezone

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.models.conversation import Conversation
from backend.models.message import Message


async def get_or_create_conversation(db: AsyncSession, user_id: uuid.UUID) -> Conversation:
    result = await db.execute(
        select(Conversation).where(Conversation.user_id == user_id)
    )
    conversation = result.scalar_one_or_none()
    if conversation is None:
        conversation = Conversation(user_id=user_id)
        db.add(conversation)
        await db.commit()
        await db.refresh(conversation)
    return conversation


async def add_message(db: AsyncSession, conversation_id: uuid.UUID, role: str, content: str) -> Message:
    message = Message(conversation_id=conversation_id, role=role, content=content)
    db.add(message)
    # Update conversation's updated_at
    result = await db.execute(
        select(Conversation).where(Conversation.id == conversation_id)
    )
    conversation = result.scalar_one_or_none()
    if conversation:
        conversation.updated_at = datetime.now(timezone.utc)
    await db.commit()
    await db.refresh(message)
    return message


async def get_messages(db: AsyncSession, conversation_id: uuid.UUID, limit: int = 20) -> list[Message]:
    result = await db.execute(
        select(Message)
        .where(Message.conversation_id == conversation_id)
        .order_by(Message.created_at.desc())
        .limit(limit)
    )
    messages = list(result.scalars().all())
    messages.reverse()  # Return in chronological order
    return messages
