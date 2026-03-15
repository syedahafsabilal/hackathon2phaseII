import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from backend.config.database import get_db
from backend.api.auth import get_current_user
from backend.schemas.chat import ChatRequest, ChatResponse, ConversationResponse, MessageResponse
from backend.services.conversation_service import get_or_create_conversation, add_message, get_messages
from backend.agent.chat_agent import run_agent

router = APIRouter(tags=["chat"])


def _check_user_match(path_user_id: uuid.UUID, auth_user_id: uuid.UUID):
    if path_user_id != auth_user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="User ID mismatch")


@router.post("/api/{user_id}/chat", response_model=ChatResponse)
async def chat(
    user_id: uuid.UUID,
    request: ChatRequest,
    current_user: uuid.UUID = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    _check_user_match(user_id, current_user)

    # Validate non-empty message
    if not request.message.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Message cannot be empty")

    try:
        # Load or create conversation
        conversation = await get_or_create_conversation(db, user_id)

        # Load conversation history (last 20 messages)
        history = await get_messages(db, conversation.id, limit=20)

        # Store user message
        await add_message(db, conversation.id, "user", request.message)

        # Build message list for agent
        messages = [{"role": msg.role, "content": msg.content} for msg in history]
        messages.append({"role": "user", "content": request.message})

        # Run agent
        agent_response = await run_agent(messages, str(user_id))

        # Store agent response
        await add_message(db, conversation.id, "assistant", agent_response)

        return ChatResponse(response=agent_response, conversation_id=conversation.id)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Agent processing error: {str(e)}",
        )


@router.get("/api/{user_id}/conversations", response_model=ConversationResponse)
async def get_conversation(
    user_id: uuid.UUID,
    current_user: uuid.UUID = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    _check_user_match(user_id, current_user)

    conversation = await get_or_create_conversation(db, user_id)
    messages = await get_messages(db, conversation.id, limit=50)

    return ConversationResponse(
        conversation_id=conversation.id,
        messages=[
            MessageResponse(
                id=msg.id,
                role=msg.role,
                content=msg.content,
                created_at=msg.created_at,
            )
            for msg in messages
        ],
    )
