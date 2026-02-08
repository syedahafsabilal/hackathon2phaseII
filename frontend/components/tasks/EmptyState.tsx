import { Button } from '../ui/Button';

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center text-white">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" x2="8" y1="13" y2="13" />
          <line x1="16" x2="8" y1="17" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">No tasks yet</h3>
      <p className="text-white mb-6 max-w-md">
        Get started by creating your first task. Your tasks will appear here once you add them.
      </p>
      <div>
        <Button>Add Your First Task</Button>
      </div>
    </div>
  );
};