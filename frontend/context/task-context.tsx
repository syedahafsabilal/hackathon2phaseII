'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './auth-context';
import { getTasks, createTask, updateTask, completeTask, deleteTask } from '../lib/api';

interface Task {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (taskData: Omit<Task, 'id' | 'isCompleted' | 'createdAt' | 'updatedAt' | 'userId'>) => Promise<void>;
  updateTask: (id: string, updatedData: Partial<Omit<Task, 'id' | 'userId' | 'createdAt'>>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTaskCompletion: (id: string) => Promise<void>;
  loading: boolean;
  refreshTasks: () => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const router = useRouter();

  const fetchTasks = async () => {
    if (!user) return;
    try {
      const data = await getTasks(user.id);
      setTasks(
        data.map((t) => ({
          id: t.id,
          title: t.title,
          description: t.description || undefined,
          isCompleted: t.is_completed,
          createdAt: new Date(t.created_at),
          updatedAt: new Date(t.updated_at),
          userId: user.id,
        }))
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      if (message.toLowerCase().includes('token') || message.toLowerCase().includes('login again') || message.toLowerCase().includes('unauthorized')) {
        logout();
        router.push('/auth/sign-in');
        return;
      }
      console.error('Failed to fetch tasks:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const addTask = async (taskData: Omit<Task, 'id' | 'isCompleted' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    if (!user) return;
    setLoading(true);
    try {
      await createTask(user.id, taskData.title, taskData.description);
      await fetchTasks();
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      if (message.toLowerCase().includes('token') || message.toLowerCase().includes('login again') || message.toLowerCase().includes('unauthorized')) {
        logout(); router.push('/auth/sign-in'); return;
      }
      console.error('Failed to add task:', error);
    }
    setLoading(false);
  };

  const updateTaskFn = async (id: string, updatedData: Partial<Omit<Task, 'id' | 'userId' | 'createdAt'>>) => {
    if (!user) return;
    setLoading(true);
    try {
      await updateTask(user.id, id, updatedData.title, updatedData.description);
      await fetchTasks();
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      if (message.toLowerCase().includes('token') || message.toLowerCase().includes('login again') || message.toLowerCase().includes('unauthorized')) {
        logout(); router.push('/auth/sign-in'); return;
      }
      console.error('Failed to update task:', error);
    }
    setLoading(false);
  };

  const deleteTaskFn = async (id: string) => {
    if (!user) return;
    setLoading(true);
    try {
      await deleteTask(user.id, id);
      await fetchTasks();
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      if (message.toLowerCase().includes('token') || message.toLowerCase().includes('login again') || message.toLowerCase().includes('unauthorized')) {
        logout(); router.push('/auth/sign-in'); return;
      }
      console.error('Failed to delete task:', error);
    }
    setLoading(false);
  };

  const toggleTaskCompletion = async (id: string) => {
    if (!user) return;
    setLoading(true);
    try {
      await completeTask(user.id, id);
      await fetchTasks();
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      if (message.toLowerCase().includes('token') || message.toLowerCase().includes('login again') || message.toLowerCase().includes('unauthorized')) {
        logout(); router.push('/auth/sign-in'); return;
      }
      console.error('Failed to toggle task:', error);
    }
    setLoading(false);
  };

  const value = {
    tasks,
    addTask,
    updateTask: updateTaskFn,
    deleteTask: deleteTaskFn,
    toggleTaskCompletion,
    loading,
    refreshTasks: fetchTasks,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
