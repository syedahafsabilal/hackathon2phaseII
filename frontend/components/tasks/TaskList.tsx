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
  onAddTask?: () => void;
}

export const TaskList = ({ tasks, isLoading = false, style, className, onAddTask }: TaskListProps) => {
  const { updateTask, deleteTask, toggleTaskCompletion } = useTasks();

  if (isLoading) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        minHeight: '200px', gap: '16px',
        background: 'rgba(10,20,50,0.4)', backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(59,130,246,0.12)', borderRadius: '24px',
        padding: '40px',
      }}>
        <LoadingSpinner size="lg" />
        <p style={{ color: 'rgba(147,197,253,0.55)', fontSize: '14px', margin: 0 }}>Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return <EmptyState onAddTask={onAddTask} />;
  }

  const completedCount = tasks.filter(t => t.isCompleted).length;

  return (
    <div role="region" aria-label="Task list" style={style} className={className}>
      {/* Section header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        marginBottom: '16px', paddingLeft: '4px',
      }}>
        <span style={{
          color: 'rgba(147,197,253,0.55)', fontSize: '11px', fontWeight: '600',
          letterSpacing: '1.5px', textTransform: 'uppercase',
        }}>
          Tasks
        </span>
        <span style={{
          padding: '2px 9px', borderRadius: '20px', fontSize: '11px', fontWeight: '600',
          background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)',
          color: '#93c5fd',
        }}>
          {completedCount}/{tasks.length}
        </span>
        <div style={{ flex: 1, height: '1px', background: 'rgba(59,130,246,0.08)' }} />
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} role="list">
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
