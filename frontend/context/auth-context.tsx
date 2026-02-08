'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on initial load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock authentication - in a real app, this would be an API call
    if (email && password) {
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setLoading(false);
      return true;
    }

    setLoading(false);
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock registration - in a real app, this would be an API call
    if (name && email && password) {
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name,
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setLoading(false);
      return true;
    }

    setLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};