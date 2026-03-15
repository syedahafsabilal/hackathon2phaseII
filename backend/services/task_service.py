import uuid
from datetime import datetime, timezone

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.models.task import Task


async def create_task(db: AsyncSession, user_id: uuid.UUID, title: str, description: str | None = None) -> Task:
    task = Task(user_id=user_id, title=title, description=description)
    db.add(task)
    await db.commit()
    await db.refresh(task)
    return task


async def list_tasks(db: AsyncSession, user_id: uuid.UUID) -> list[Task]:
    result = await db.execute(
        select(Task).where(Task.user_id == user_id).order_by(Task.created_at.desc())
    )
    return list(result.scalars().all())


async def get_task(db: AsyncSession, user_id: uuid.UUID, task_id: uuid.UUID) -> Task | None:
    result = await db.execute(
        select(Task).where(Task.id == task_id, Task.user_id == user_id)
    )
    return result.scalar_one_or_none()


async def update_task(
    db: AsyncSession, user_id: uuid.UUID, task_id: uuid.UUID,
    title: str | None = None, description: str | None = None
) -> Task | None:
    task = await get_task(db, user_id, task_id)
    if task is None:
        return None
    if title is not None:
        task.title = title
    if description is not None:
        task.description = description
    task.updated_at = datetime.now(timezone.utc)
    await db.commit()
    await db.refresh(task)
    return task


async def complete_task(db: AsyncSession, user_id: uuid.UUID, task_id: uuid.UUID) -> Task | None:
    task = await get_task(db, user_id, task_id)
    if task is None:
        return None
    task.is_completed = True
    task.completed_at = datetime.now(timezone.utc)
    task.updated_at = datetime.now(timezone.utc)
    await db.commit()
    await db.refresh(task)
    return task


async def delete_task(db: AsyncSession, user_id: uuid.UUID, task_id: uuid.UUID) -> bool:
    task = await get_task(db, user_id, task_id)
    if task is None:
        return False
    await db.delete(task)
    await db.commit()
    return True
