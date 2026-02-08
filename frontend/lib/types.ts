// User Session type representing the authenticated state of a user
export interface UserSession {
  id: string;
  email: string;
  name: string;
  isAuthenticated: boolean;
  token?: string;
  createdAt: Date;
  expiresAt?: Date;
}

// Task type representing a todo item
export interface Task {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  userId: string;
}

// Modal state type
export interface ModalState {
  isVisible: boolean;
  type: 'add-task' | 'edit-task' | 'confirm-delete' | null;
  data?: any;
}

// Loading states type
export interface LoadingStates {
  isPageLoading: boolean;
  isTaskSaving: boolean;
  isAuthenticationPending: boolean;
}

// Form state type
export interface FormState {
  values: Record<string, any>;
  errors: Record<string, string>;
  isValid: boolean;
  isSubmitting: boolean;
}

// UI state type
export interface UIState {
  modalState: ModalState;
  loadingStates: LoadingStates;
  formStates: Record<string, FormState>;
}

// Form validation errors type
export interface FormErrors {
  [key: string]: string;
}

// Task form data type
export interface TaskFormData {
  title: string;
  description?: string;
}