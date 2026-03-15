import logging
import uuid
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from backend.config.database import get_db
from backend.schemas.user import RegisterRequest, LoginRequest, AuthResponse
from backend.services.auth_service import register_user, login_user, create_token, verify_token

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/auth", tags=["auth"])

# auto_error=False lets get_current_user produce descriptive 401 messages instead of
# a generic FastAPI "Not authenticated" when the Authorization header is missing.
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token", auto_error=False)


async def get_current_user(
    request: Request,
    token: Optional[str] = Depends(oauth2_scheme),
) -> uuid.UUID:
    """
    Validate the JWT Bearer token from the Authorization header.

    Required header:  Authorization: Bearer <token>
    Get a token from: POST /api/auth/login  (JSON body)
    Or use the Swagger UI "Authorize" button (calls POST /api/auth/token with form data).
    """
    if token is None:
        raw = request.headers.get("Authorization", "")
        if raw:
            # Header present but not parseable as Bearer — give a specific hint
            logger.warning("get_current_user: malformed Authorization header: %r", raw[:80])
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=(
                    f"Malformed Authorization header: {raw[:80]!r}. "
                    "Expected format:  Authorization: Bearer <JWT_token>"
                ),
                headers={"WWW-Authenticate": "Bearer"},
            )
        logger.warning("get_current_user: no Authorization header on %s", request.url.path)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=(
                "Authorization header missing. "
                "Add:  Authorization: Bearer <token>  "
                "Get your token from POST /api/auth/login."
            ),
            headers={"WWW-Authenticate": "Bearer"},
        )

    user_id = verify_token(token)
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token. Login again at POST /api/auth/login.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user_id


@router.post("/token", tags=["auth"])
async def token_endpoint(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db),
):
    """
    OAuth2-compatible token endpoint for Swagger UI authorization.

    Use **email** as the username field and your password.
    Returns ``{"access_token": "...", "token_type": "bearer"}``.
    """
    user = await login_user(db, form_data.username, form_data.password)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_token(user.id)
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
async def register(request: RegisterRequest, db: AsyncSession = Depends(get_db)):
    user = await register_user(db, request.name, request.email, request.password)
    if user is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    token = create_token(user.id)
    return AuthResponse(id=user.id, name=user.name, email=user.email, token=token)


@router.post("/login", response_model=AuthResponse)
async def login(request: LoginRequest, db: AsyncSession = Depends(get_db)):
    user = await login_user(db, request.email, request.password)
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = create_token(user.id)
    return AuthResponse(id=user.id, name=user.name, email=user.email, token=token)
