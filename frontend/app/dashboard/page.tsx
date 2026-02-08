'use client';

import { TaskList } from '../../components/tasks/TaskList';
import { AddTaskModal } from '../../components/tasks/AddTaskModal';
import { Button } from '../../components/ui/Button';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useState } from 'react';
import { useTasks } from '../../context/task-context';

export default function DashboardPage() {
  const { tasks, addTask: addTaskToContext, loading } = useTasks();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddTask = async (taskData: { title: string; description?: string }) => {
    await addTaskToContext(taskData);
    setIsAddModalOpen(false);
  };

  return (
    <div className="max-w-4xl w-full px-4 relative" style={{ zIndex: 10 }}>
      <div className="flex flex-col items-center gap-4 mb-8 w-full">
        <h1 className="text-4xl font-bold text-white relative text-center" style={{ zIndex: 15 }}>Dashboard</h1>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full sm:w-auto relative text-white"
          style={{ zIndex: 15 }}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="mr-2"><LoadingSpinner size="sm" /></span>
              Adding...
            </>
          ) : 'Add New Task'}
        </Button>
      </div>

      <TaskList
        tasks={tasks}
        isLoading={loading}
        style={{ zIndex: 15, width: '100%' }}
        className="relative"
      />

      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTask={handleAddTask}
        style={{ zIndex: 20 }} // Higher z-index for modal
      />
    </div>
  );
}