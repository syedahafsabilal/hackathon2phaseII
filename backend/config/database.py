from urllib.parse import urlparse, parse_qs, urlencode, urlunparse

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase

from backend.config.settings import settings


def _fix_async_url(url: str) -> tuple[str, dict]:
    """Convert a standard PostgreSQL URL to one compatible with asyncpg.

    - Swaps the scheme to postgresql+asyncpg://
    - Removes query params asyncpg doesn't understand (sslmode, channel_binding)
    - Returns (clean_url, connect_args) where connect_args has ssl settings
    """
    if url.startswith("postgresql://"):
        url = url.replace("postgresql://", "postgresql+asyncpg://", 1)

    parsed = urlparse(url)
    params = parse_qs(parsed.query)

    connect_args: dict = {}

    # asyncpg uses 'ssl' instead of 'sslmode'
    if "sslmode" in params:
        sslmode = params.pop("sslmode")[0]
        if sslmode in ("require", "verify-ca", "verify-full"):
            connect_args["ssl"] = "require"

    # asyncpg doesn't support channel_binding
    params.pop("channel_binding", None)

    # Rebuild URL without removed params
    new_query = urlencode({k: v[0] for k, v in params.items()})
    clean_url = urlunparse(parsed._replace(query=new_query))

    return clean_url, connect_args


_db_url, _connect_args = _fix_async_url(settings.DATABASE_URL)

engine = create_async_engine(_db_url, echo=False, connect_args=_connect_args)

async_session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


async def get_db():
    async with async_session() as session:
        try:
            yield session
        finally:
            await session.close()


async def create_tables():
    from backend.models import User, Task, Conversation, Message  # noqa: F401

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
