import logging
import uuid
from datetime import datetime, timedelta, timezone

from jose import jwt, JWTError
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.config.settings import settings
from backend.models.user import User
from backend.utils.security import hash_password, verify_password

logger = logging.getLogger(__name__)


def create_token(user_id: uuid.UUID) -> str:
    expire = datetime.now(timezone.utc) + timedelta(hours=settings.JWT_EXPIRATION_HOURS)
    payload = {"sub": str(user_id), "exp": expire}
    return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)


def verify_token(token: str) -> uuid.UUID | None:
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            logger.warning("verify_token: token has no 'sub' claim")
            return None
        return uuid.UUID(user_id)
    except JWTError as e:
        logger.warning("verify_token: JWT validation failed — %s: %s", type(e).__name__, e)
        return None
    except ValueError as e:
        logger.warning("verify_token: could not parse UUID from token sub — %s", e)
        return None
    except Exception as e:
        logger.error("verify_token: unexpected error — %s: %s", type(e).__name__, e)
        return None


async def register_user(db: AsyncSession, name: str, email: str, password: str) -> User | None:
    result = await db.execute(select(User).where(User.email == email.lower()))
    existing = result.scalar_one_or_none()
    if existing:
        return None

    user = User(
        name=name,
        email=email.lower(),
        password_hash=hash_password(password),
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


async def login_user(db: AsyncSession, email: str, password: str) -> User | None:
    result = await db.execute(select(User).where(User.email == email.lower()))
    user = result.scalar_one_or_none()
    if user is None or not verify_password(password, user.password_hash):
        return None
    return user
