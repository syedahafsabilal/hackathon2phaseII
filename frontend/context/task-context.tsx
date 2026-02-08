'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './auth-context';

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
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Load tasks from localStorage on mount
  useEffect(() => {
    if (user) {
      const storedTasks = localStorage.getItem(`tasks-${user.id}`);
      if (storedTasks) {
        try {
          // Parse dates back to Date objects
          const parsedTasks = JSON.parse(storedTasks).map((task: any) => ({
            ...task,
            createdAt: new Date(task.createdAt),
            updatedAt: new Date(task.updatedAt),
          }));
          setTasks(parsedTasks);
        } catch (error) {
          console.error('Failed to parse tasks from localStorage:', error);
        }
      }
    }
    setLoading(false);
  }, [user]);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (user && !loading) {
      const tasksToStore = tasks
        .filter(task => task.userId === user.id)
        .map(task => ({
          ...task,
          createdAt: task.createdAt.toISOString(),
          updatedAt: task.updatedAt.toISOString(),
        }));

      localStorage.setItem(`tasks-${user.id}`, JSON.stringify(tasksToStore));
    }
  }, [tasks, user, loading]);

  const addTask = async (taskData: Omit<Task, 'id' | 'isCompleted' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    if (!user) return;

    setLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const newTask: Task = {
      id: Date.now().toString(),
      ...taskData,
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: user.id,
    };

    setTasks(prev => [...prev, newTask]);
    setLoading(false);
  };

  const updateTask = async (id: string, updatedData: Partial<Omit<Task, 'id' | 'userId' | 'createdAt'>>) => {
    setLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));

    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, ...updatedData, updatedAt: new Date() }
          : task
      )
    );

    setLoading(false);
  };

  const deleteTask = async (id: string) => {
    setLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 400));

    setTasks(prev => prev.filter(task => task.id !== id));
    setLoading(false);
  };

  const toggleTaskCompletion = async (id: string) => {
    setLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 200));

    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, isCompleted: !task.isCompleted, updatedAt: new Date() }
          : task
      )
    );

    setLoading(false);
  };

  const value = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    loading,
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