import { useState } from 'react';
import { Task } from '../../lib/types';
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
        await new Promise(resolve => setTimeout(resolve, 300));
        onDelete();
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <>
      <li
        style={{
          background: task.isCompleted
            ? 'linear-gradient(135deg, rgba(8,16,38,0.65) 0%, rgba(10,18,42,0.55) 100%)'
            : 'linear-gradient(135deg, rgba(12,24,58,0.75) 0%, rgba(15,30,72,0.6) 100%)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: task.isCompleted
            ? '1px solid rgba(59,130,246,0.08)'
            : '1px solid rgba(59,130,246,0.22)',
          borderRadius: '18px',
          padding: '20px 24px',
          marginBottom: '12px',
          transition: 'all 0.25s ease',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: task.isCompleted
            ? '0 4px 20px rgba(0,0,0,0.2)'
            : '0 6px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(59,130,246,0.04)',
          listStyle: 'none',
        }}
        onMouseEnter={e => {
          if (!task.isCompleted) {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 44px rgba(0,0,0,0.4), 0 0 0 1px rgba(59,130,246,0.18)';
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(59,130,246,0.38)';
          }
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLElement).style.boxShadow = task.isCompleted
            ? '0 4px 20px rgba(0,0,0,0.2)'
            : '0 6px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(59,130,246,0.04)';
          (e.currentTarget as HTMLElement).style.borderColor = task.isCompleted
            ? 'rgba(59,130,246,0.08)'
            : 'rgba(59,130,246,0.22)';
        }}
        role="listitem"
        aria-labelledby={`task-${task.id}-title`}
      >
        {/* Top accent shimmer */}
        {!task.isCompleted && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
            background: 'linear-gradient(90deg, transparent 10%, rgba(59,130,246,0.35) 40%, rgba(147,197,253,0.45) 50%, rgba(59,130,246,0.35) 60%, transparent 90%)',
          }} />
        )}

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          {/* Checkbox */}
          <div style={{ paddingTop: '3px', flexShrink: 0 }}>
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={onToggleCompletion}
              style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#3B82F6' }}
              aria-label={`Mark "${task.title}" as ${task.isCompleted ? 'incomplete' : 'complete'}`}
            />
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
            {/* Status badge */}
            <div style={{ marginBottom: '8px' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                padding: '3px 11px', borderRadius: '20px', fontSize: '11px', fontWeight: '600',
                letterSpacing: '0.4px',
                background: task.isCompleted ? 'rgba(34,197,94,0.12)' : 'rgba(59,130,246,0.13)',
                border: `1px solid ${task.isCompleted ? 'rgba(34,197,94,0.28)' : 'rgba(59,130,246,0.28)'}`,
                color: task.isCompleted ? '#86efac' : '#93c5fd',
              }}>
                {task.isCompleted ? '✓ Completed' : '● In Progress'}
              </span>
            </div>

            {/* Title */}
            <p
              id={`task-${task.id}-title`}
              style={{
                fontSize: '16px', fontWeight: '600', margin: '0 0 6px 0',
                color: task.isCompleted ? 'rgba(255,255,255,0.38)' : 'rgba(255,255,255,0.92)',
                textDecoration: task.isCompleted ? 'line-through' : 'none',
                lineHeight: '1.4',
              }}
            >
              {task.title}
            </p>

            {/* Description */}
            {task.description && (
              <p style={{
                fontSize: '14px', color: 'rgba(147,197,253,0.5)',
                margin: '0 0 10px 0', lineHeight: '1.55',
              }}>
                {task.description}
              </p>
            )}

            {/* Meta */}
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.22)', margin: 0 }}>
              Created {new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              {task.completedAt && task.isCompleted && (
                <span> · Completed {new Date(task.completedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              )}
            </p>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '8px', flexShrink: 0, paddingTop: '2px' }}>
            <button
              onClick={() => setIsEditModalOpen(true)}
              style={{
                padding: '7px 15px', borderRadius: '9px', fontSize: '13px', fontWeight: '500',
                background: 'rgba(59,130,246,0.09)', border: '1px solid rgba(59,130,246,0.22)',
                color: '#93c5fd', cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(59,130,246,0.2)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(59,130,246,0.09)'; }}
              aria-label={`Edit "${task.title}"`}
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              style={{
                padding: '7px 15px', borderRadius: '9px', fontSize: '13px', fontWeight: '500',
                background: 'rgba(239,68,68,0.09)', border: '1px solid rgba(239,68,68,0.2)',
                color: '#fca5a5', cursor: 'pointer', transition: 'all 0.2s',
                opacity: isDeleting ? 0.5 : 1,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.2)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.09)'; }}
              aria-label={`Delete "${task.title}"`}
            >
              {isDeleting ? '...' : 'Delete'}
            </button>
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
