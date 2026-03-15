import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from backend.config.database import get_db
from backend.api.auth import get_current_user
from backend.schemas.task import TaskCreate, TaskUpdate, TaskResponse
from backend.services import task_service

router = APIRouter(tags=["tasks"])


def _check_user_match(path_user_id: uuid.UUID, auth_user_id: uuid.UUID):
    if path_user_id != auth_user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="User ID mismatch")


@router.get("/api/{user_id}/tasks", response_model=list[TaskResponse])
async def get_tasks(
    user_id: uuid.UUID,
    current_user: uuid.UUID = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    _check_user_match(user_id, current_user)
    tasks = await task_service.list_tasks(db, user_id)
    return tasks


@router.post("/api/{user_id}/tasks", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_task(
    user_id: uuid.UUID,
    request: TaskCreate,
    current_user: uuid.UUID = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    _check_user_match(user_id, current_user)
    task = await task_service.create_task(db, user_id, request.title, request.description)
    return task


@router.put("/api/{user_id}/tasks/{task_id}", response_model=TaskResponse)
async def update_task(
    user_id: uuid.UUID,
    task_id: uuid.UUID,
    request: TaskUpdate,
    current_user: uuid.UUID = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    _check_user_match(user_id, current_user)
    task = await task_service.update_task(db, user_id, task_id, request.title, request.description)
    if task is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return task


@router.patch("/api/{user_id}/tasks/{task_id}/complete", response_model=TaskResponse)
async def complete_task(
    user_id: uuid.UUID,
    task_id: uuid.UUID,
    current_user: uuid.UUID = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    _check_user_match(user_id, current_user)
    task = await task_service.complete_task(db, user_id, task_id)
    if task is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return task


@router.delete("/api/{user_id}/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    user_id: uuid.UUID,
    task_id: uuid.UUID,
    current_user: uuid.UUID = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    _check_user_match(user_id, current_user)
    deleted = await task_service.delete_task(db, user_id, task_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
