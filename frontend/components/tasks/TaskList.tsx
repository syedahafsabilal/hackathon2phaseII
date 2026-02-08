'use client';

import { Task } from '../../lib/types';
import { TaskCard } from './TaskCard';
import { EmptyState } from './EmptyState';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { useTasks } from '../../context/task-context';

interface TaskListProps {
  tasks: Task[];
  isLoading?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export const TaskList = ({ tasks, isLoading = false, style, className }: TaskListProps) => {
  const { updateTask, deleteTask, toggleTaskCompletion } = useTasks();

  if (isLoading) {
    return (
      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden p-8 flex flex-col items-center justify-center min-h-[200px]">
        <LoadingSpinner size="lg" className="text-primary mb-4" />
        <p className="text-muted-foreground">Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div
      className={`bg-card rounded-xl shadow-sm border border-border overflow-hidden ${className || ''}`}
      role="region"
      aria-label="Task list"
      style={style}
    >
      <ul className="divide-y divide-border" role="list">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onUpdate={(updatedData) => updateTask(task.id, updatedData)}
            onDelete={() => deleteTask(task.id)}
            onToggleCompletion={() => toggleTaskCompletion(task.id)}
          />
        ))}
      </ul>
    </div>
  );
};