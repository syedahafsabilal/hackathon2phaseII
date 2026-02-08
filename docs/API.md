# API Documentation

## Overview
This document describes the planned API integration for the Todo Application frontend. While the current implementation uses mock data, the structure is designed for seamless backend integration.

## Authentication API

### POST /api/auth/login
Authenticate user and return session token

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-123",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "jwt-token-string",
    "expiresAt": "2023-12-31T23:59:59.000Z"
  }
}
```

### POST /api/auth/register
Register a new user

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-123",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "jwt-token-string"
  }
}
```

### POST /api/auth/logout
Logout user and invalidate session

**Response:**
```json
{
  "success": true,
  "message": "Successfully logged out"
}
```

## Task Management API

### GET /api/tasks
Retrieve all tasks for authenticated user

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "task-1",
      "title": "Sample Task",
      "description": "Task description",
      "isCompleted": false,
      "createdAt": "2023-12-01T10:00:00.000Z",
      "updatedAt": "2023-12-01T10:00:00.000Z",
      "completedAt": null,
      "userId": "user-123"
    }
  ]
}
```

### POST /api/tasks
Create a new task

**Request Body:**
```json
{
  "title": "New Task",
  "description": "Task description",
  "isCompleted": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "task-456",
    "title": "New Task",
    "description": "Task description",
    "isCompleted": false,
    "createdAt": "2023-12-01T10:00:00.000Z",
    "updatedAt": "2023-12-01T10:00:00.000Z",
    "completedAt": null,
    "userId": "user-123"
  }
}
```

### PUT /api/tasks/{id}
Update an existing task

**Request Body:**
```json
{
  "title": "Updated Task Title",
  "description": "Updated description",
  "isCompleted": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "task-456",
    "title": "Updated Task Title",
    "description": "Updated description",
    "isCompleted": true,
    "createdAt": "2023-12-01T10:00:00.000Z",
    "updatedAt": "2023-12-01T11:00:00.000Z",
    "completedAt": "2023-12-01T11:00:00.000Z",
    "userId": "user-123"
  }
}
```

### DELETE /api/tasks/{id}
Delete a task

**Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

## Error Handling

### Common Error Responses

**Authentication Error:**
```json
{
  "success": false,
  "error": {
    "code": "AUTHENTICATION_ERROR",
    "message": "Invalid credentials"
  }
}
```

**Validation Error:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "email": "Email is required",
      "password": "Password must be at least 8 characters"
    }
  }
}
```

**General Error:**
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred"
  }
}
```

## Headers

All authenticated requests should include the Authorization header:

```
Authorization: Bearer {jwt-token}
```

## Status Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error