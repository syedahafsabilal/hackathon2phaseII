import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.config.database import create_tables
from backend.config.settings import settings
from backend.api.auth import router as auth_router
from backend.api.tasks import router as tasks_router
from backend.api.chat import router as chat_router

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting up — creating database tables...")
    await create_tables()
    logger.info("Database tables created successfully")
    logger.info(f"CORS origins: http://localhost:3000")
    yield
    logger.info("Shutting down...")


app = FastAPI(
    title="Todo Chatbot API",
    description="AI-powered conversational todo management backend",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(tasks_router)
app.include_router(chat_router)


@app.get("/health")
async def health():
    return {"status": "ok"}
