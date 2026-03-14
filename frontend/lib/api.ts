const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export interface AuthResponse {
  id: string;
  name: string;
  email: string;
  token: string;
}

export interface ChatResponse {
  response: string;
  conversation_id: string;
}

export interface MessageData {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface ConversationData {
  conversation_id: string;
  messages: MessageData[];
}

export interface TaskData {
  id: string;
  title: string;
  description: string | null;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
}

export async function register(name: string, email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Registration failed');
  }
  return res.json();
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Login failed');
  }
  return res.json();
}

export async function sendMessage(userId: string, message: string): Promise<ChatResponse> {
  const res = await fetch(`${API_BASE_URL}/api/${userId}/chat`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ message }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Failed to send message');
  }
  return res.json();
}

export async function getConversation(userId: string): Promise<ConversationData> {
  const res = await fetch(`${API_BASE_URL}/api/${userId}/conversations`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Failed to load conversation');
  }
  return res.json();
}

export async function getTasks(userId: string): Promise<TaskData[]> {
  const res = await fetch(`${API_BASE_URL}/api/${userId}/tasks`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Failed to load tasks');
  }
  return res.json();
}

export async function createTask(userId: string, title: string, description?: string): Promise<TaskData> {
  const res = await fetch(`${API_BASE_URL}/api/${userId}/tasks`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ title, description: description || null }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Failed to create task');
  }
  return res.json();
}

export async function updateTask(userId: string, taskId: string, title?: string, description?: string): Promise<TaskData> {
  const res = await fetch(`${API_BASE_URL}/api/${userId}/tasks/${taskId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ title, description }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Failed to update task');
  }
  return res.json();
}

export async function completeTask(userId: string, taskId: string): Promise<TaskData> {
  const res = await fetch(`${API_BASE_URL}/api/${userId}/tasks/${taskId}/complete`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Failed to complete task');
  }
  return res.json();
}

export async function deleteTask(userId: string, taskId: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/${userId}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Failed to delete task');
  }
}
