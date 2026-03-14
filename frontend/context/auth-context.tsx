'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as apiLogin, register as apiRegister } from '../lib/api';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  register: (name: string, email: string, password: string) => Promise<string | null>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  const login = async (email: string, password: string): Promise<string | null> => {
    setLoading(true);
    try {
      const data = await apiLogin(email, password);
      const loggedInUser: User = { id: data.id, email: data.email, name: data.name };
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      localStorage.setItem('token', data.token);
      setLoading(false);
      return null;
    } catch (error) {
      console.error('Login failed:', error);
      setLoading(false);
      return error instanceof Error ? error.message : 'Login failed. Please try again.';
    }
  };

  const register = async (name: string, email: string, password: string): Promise<string | null> => {
    setLoading(true);
    try {
      const data = await apiRegister(name, email, password);
      const registeredUser: User = { id: data.id, email: data.email, name: data.name };
      setUser(registeredUser);
      localStorage.setItem('user', JSON.stringify(registeredUser));
      localStorage.setItem('token', data.token);
      setLoading(false);
      return null;
    } catch (error) {
      console.error('Registration failed:', error);
      setLoading(false);
      return error instanceof Error ? error.message : 'Registration failed. Please try again.';
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
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
