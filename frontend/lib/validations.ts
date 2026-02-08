import { TaskFormData } from './types';

// Validation rules for task data
export const validateTask = (task: TaskFormData): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  // Validate title
  if (!task.title || task.title.trim().length === 0) {
    errors.title = 'Title is required';
  } else if (task.title.trim().length > 200) {
    errors.title = 'Title must be less than 200 characters';
  }

  // Validate description length if provided
  if (task.description && task.description.length > 1000) {
    errors.description = 'Description must be less than 1000 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validation rules for authentication forms
export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  if (!email || email.trim().length === 0) {
    return { isValid: false, error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  if (email.length > 254) {
    return { isValid: false, error: 'Email is too long' };
  }

  return { isValid: true };
};

export const validatePassword = (password: string): { isValid: boolean; error?: string } => {
  if (!password || password.length === 0) {
    return { isValid: false, error: 'Password is required' };
  }

  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters' };
  }

  // Check for password complexity (at least one uppercase, lowercase, and number)
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);

  if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
    return { isValid: false, error: 'Password must contain uppercase, lowercase, and number' };
  }

  return { isValid: true };
};

export const validateName = (name: string): { isValid: boolean; error?: string } => {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: 'Name is required' };
  }

  if (name.trim().length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters' };
  }

  if (name.trim().length > 50) {
    return { isValid: false, error: 'Name must be less than 50 characters' };
  }

  return { isValid: true };
};

// Generic form validator
export const validateForm = (formData: Record<string, any>, rules: Record<string, (value: any) => { isValid: boolean; error?: string }>): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  for (const field in rules) {
    const rule = rules[field];
    const result = rule(formData[field]);

    if (!result.isValid) {
      errors[field] = result.error || `${field} is invalid`;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};