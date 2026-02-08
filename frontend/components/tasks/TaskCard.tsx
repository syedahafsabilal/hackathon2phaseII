import { useState } from 'react';
import { Task } from '../../lib/types';
import { Button } from '../ui/Button';
import { EditTaskModal } from './EditTaskModal';

interface TaskCardProps {
  task: Task;
  onUpdate: (updatedData: Partial<{ title: string; description: string; isCompleted: boolean }>) => void;
  onDelete: () => void;
  onToggleCompletion: () => void;
}

export const TaskCard = ({ task, onUpdate, onDelete, onToggleCompletion }: TaskCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      setIsDeleting(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300));

        // Call parent function to delete task
        onDelete();
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleToggleComplete = () => {
    onToggleCompletion();
  };

  return (
    <>
      <li
        className="p-4 bg-card border border-border rounded-lg shadow-sm transition-all duration-200 hover:shadow-md text-white"
        role="listitem"
        aria-labelledby={`task-${task.id}-title`}
      >
        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
          <div className="flex-shrink-0 pt-1">
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={handleToggleComplete}
              className="h-5 w-5 text-primary rounded focus:ring-primary/50"
              aria-label={`Mark task "${task.title}" as ${task.isCompleted ? 'incomplete' : 'complete'}`}
              id={`task-${task.id}-checkbox`}
            />
          </div>

          <div className="min-w-0 flex-1">
            <p
              id={`task-${task.id}-title`}
              className={`text-base font-medium ${task.isCompleted ? 'line-through text-white' : 'text-white'}`}
              aria-label={task.isCompleted ? `${task.title}, completed` : `${task.title}, not completed`}
            >
              {task.title}
            </p>

            {task.description && (
              <p
                className={`text-sm mt-1 ${task.isCompleted ? 'text-white' : 'text-white'}`}
                id={`task-${task.id}-description`}
              >
                {task.description}
              </p>
            )}

            <div className="mt-2 flex flex-wrap items-center text-xs text-white gap-2" role="group" aria-label="Task metadata">
              <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
              {task.completedAt && task.isCompleted && (
                <span id={`task-${task.id}-completed`}>
                  Completed: {new Date(task.completedAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>

          <div className="flex space-x-2" role="group" aria-label="Task actions">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditModalOpen(true)}
              className="text-xs"
              aria-label={`Edit task "${task.title}"`}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-xs"
              aria-label={`Delete task "${task.title}"`}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      </li>

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={task}
        onSave={(updatedData) => {
          onUpdate(updatedData);
          setIsEditModalOpen(false);
        }}
      />
    </>
  );
};