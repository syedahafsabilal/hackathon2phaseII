"""
MCP Server for task management tools.

This module creates a stdio-based MCP server using FastMCP.
The server exposes 5 task tools that the AI agent uses to manage tasks.
Each tool operates on the database via the task_service layer.
"""

import sys
import asyncio
import uuid

from mcp.server.fastmcp import FastMCP

from backend.config.database import async_session
from backend.services import task_service

mcp = FastMCP("todo-task-manager")


@mcp.tool()
async def add_task(user_id: str, title: str, description: str = "") -> str:
    """Create a new task for the user.

    Args:
        user_id: The UUID of the user who owns the task
        title: The title of the task (required)
        description: Optional description for the task
    """
    try:
        uid = uuid.UUID(user_id)
        async with async_session() as db:
            task = await task_service.create_task(db, uid, title, description or None)
            return f"Task created: '{task.title}' (ID: {task.id})"
    except Exception as e:
        return f"Error creating task: {str(e)}"


@mcp.tool()
async def list_tasks(user_id: str) -> str:
    """List all tasks for the user.

    Args:
        user_id: The UUID of the user whose tasks to list
    """
    try:
        uid = uuid.UUID(user_id)
        async with async_session() as db:
            tasks = await task_service.list_tasks(db, uid)
            if not tasks:
                return "You have no tasks yet. Would you like to create one?"
            lines = []
            for i, t in enumerate(tasks, 1):
                status = "Done" if t.is_completed else "Pending"
                desc = f" - {t.description}" if t.description else ""
                lines.append(f"{i}. [{status}] {t.title}{desc} (ID: {t.id})")
            return "Your tasks:\n" + "\n".join(lines)
    except Exception as e:
        return f"Error listing tasks: {str(e)}"


@mcp.tool()
async def complete_task(user_id: str, task_id: str) -> str:
    """Mark a task as completed.

    Args:
        user_id: The UUID of the user who owns the task
        task_id: The UUID of the task to complete
    """
    try:
        uid = uuid.UUID(user_id)
        tid = uuid.UUID(task_id)
        async with async_session() as db:
            task = await task_service.complete_task(db, uid, tid)
            if task is None:
                return f"Task not found (ID: {task_id}). Try listing your tasks to see available tasks."
            return f"Task completed: '{task.title}'"
    except Exception as e:
        return f"Error completing task: {str(e)}"


@mcp.tool()
async def delete_task(user_id: str, task_id: str) -> str:
    """Delete a task.

    Args:
        user_id: The UUID of the user who owns the task
        task_id: The UUID of the task to delete
    """
    try:
        uid = uuid.UUID(user_id)
        tid = uuid.UUID(task_id)
        async with async_session() as db:
            deleted = await task_service.delete_task(db, uid, tid)
            if not deleted:
                return f"Task not found (ID: {task_id}). Try listing your tasks to see available tasks."
            return f"Task deleted successfully (ID: {task_id})"
    except Exception as e:
        return f"Error deleting task: {str(e)}"


@mcp.tool()
async def update_task(user_id: str, task_id: str, title: str = "", description: str = "") -> str:
    """Update a task's title or description.

    Args:
        user_id: The UUID of the user who owns the task
        task_id: The UUID of the task to update
        title: New title for the task (leave empty to keep current)
        description: New description for the task (leave empty to keep current)
    """
    try:
        uid = uuid.UUID(user_id)
        tid = uuid.UUID(task_id)
        async with async_session() as db:
            task = await task_service.update_task(
                db, uid, tid,
                title=title if title else None,
                description=description if description else None,
            )
            if task is None:
                return f"Task not found (ID: {task_id}). Try listing your tasks to see available tasks."
            updated_fields = []
            if title:
                updated_fields.append(f"title to '{title}'")
            if description:
                updated_fields.append(f"description to '{description}'")
            return f"Task updated: {', '.join(updated_fields)} (ID: {task.id})"
    except Exception as e:
        return f"Error updating task: {str(e)}"


def main():
    """Run the MCP server via stdio."""
    mcp.run(transport="stdio")


if __name__ == "__main__":
    main()
