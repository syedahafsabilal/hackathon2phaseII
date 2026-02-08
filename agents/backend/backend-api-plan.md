# Todo Application Backend API Plan

## Overview

This document outlines the backend REST API architecture for the Todo application built with FastAPI. All endpoints are secured with JWT authentication, ensuring users can only access their own tasks. The API follows RESTful principles with proper HTTP status codes and comprehensive error handling.

## API Base URL
```
https://api.todoapp.com/v1
```

## Authentication

All endpoints except authentication endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <jwt-token>
```

## API Endpoints

### Authentication Endpoints

#### POST /auth/register
Register a new user account
- **Request Body:**
```json
{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "SecurePassword123!",
  "first_name": "John",
  "last_name": "Doe"
}
```
- **Response (201 Created):**
```json
{
  "message": "Registration successful. Please check your email for verification.",
  "user": {
    "id": "uuid-string",
    "email": "user@example.com",
    "username": "johndoe",
    "first_name": "John",
    "last_name": "Doe",
    "created_at": "2023-10-01T10:00:00Z"
  }
}
```
- **Errors:**
  - 400: Invalid input data
  - 409: Email or username already exists
  - 422: Validation error

#### POST /auth/login
Authenticate user and return JWT tokens
- **Request Body:**
```json
{
  "email_or_username": "user@example.com",
  "password": "SecurePassword123!"
}
```
- **Response (200 OK):**
```json
{
  "access_token": "jwt-access-token",
  "refresh_token": "refresh-token-uuid",
  "token_type": "bearer",
  "expires_in": 3600,
  "user": {
    "id": "uuid-string",
    "email": "user@example.com",
    "username": "johndoe",
    "first_name": "John",
    "last_name": "Doe"
  }
}
```
- **Errors:**
  - 400: Invalid credentials
  - 401: Account inactive or not verified
  - 422: Validation error

#### POST /auth/refresh
Refresh the access token using refresh token
- **Headers:**
```
Cookie: refresh_token=refresh-token-uuid
```
- **Response (200 OK):**
```json
{
  "access_token": "new-jwt-access-token",
  "token_type": "bearer",
  "expires_in": 3600
}
```
- **Errors:**
  - 401: Invalid or expired refresh token

#### POST /auth/logout
Logout user and invalidate tokens
- **Headers:**
```
Authorization: Bearer <jwt-token>
Cookie: refresh_token=refresh-token-uuid
```
- **Response (200 OK):**
```json
{
  "message": "Successfully logged out"
}
```

### Todo Management Endpoints

#### GET /todos
Retrieve user's todos with optional filtering and pagination
- **Headers:**
```
Authorization: Bearer <jwt-token>
```
- **Query Parameters:**
  - `status` (optional): Filter by status (pending, in_progress, completed)
  - `priority` (optional): Filter by priority (1-5)
  - `due_after` (optional): Filter todos due after date (ISO 8601)
  - `due_before` (optional): Filter todos due before date (ISO 8601)
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 20, max: 100)
  - `search` (optional): Search term for title/description
  - `tag` (optional): Filter by tag name

- **Response (200 OK):**
```json
{
  "todos": [
    {
      "id": "uuid-string",
      "title": "Complete project proposal",
      "description": "Finish and submit the project proposal",
      "status": "pending",
      "priority": 3,
      "due_date": "2023-10-15T10:00:00Z",
      "completed_at": null,
      "created_at": "2023-10-01T10:00:00Z",
      "updated_at": "2023-10-01T10:00:00Z",
      "tags": [
        {
          "id": "tag-uuid",
          "name": "work",
          "color": "#ff0000"
        }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 15,
    "pages": 1
  }
}
```
- **Errors:**
  - 401: Unauthorized (invalid/expired token)
  - 422: Invalid query parameters

#### POST /todos
Create a new todo for the authenticated user
- **Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```
- **Request Body:**
```json
{
  "title": "Complete project proposal",
  "description": "Finish and submit the project proposal",
  "status": "pending",
  "priority": 3,
  "due_date": "2023-10-15T10:00:00Z",
  "tags": ["work", "important"]
}
```
- **Response (201 Created):**
```json
{
  "id": "uuid-string",
  "title": "Complete project proposal",
  "description": "Finish and submit the project proposal",
  "status": "pending",
  "priority": 3,
  "due_date": "2023-10-15T10:00:00Z",
  "completed_at": null,
  "created_at": "2023-10-01T10:00:00Z",
  "updated_at": "2023-10-01T10:00:00Z",
  "tags": [
    {
      "id": "tag-uuid",
      "name": "work",
      "color": "#ff0000"
    }
  ]
}
```
- **Errors:**
  - 401: Unauthorized
  - 422: Validation error

#### GET /todos/{todo_id}
Get a specific todo by ID
- **Headers:**
```
Authorization: Bearer <jwt-token>
```
- **Parameters:**
  - `todo_id`: UUID of the todo

- **Response (200 OK):**
```json
{
  "id": "uuid-string",
  "title": "Complete project proposal",
  "description": "Finish and submit the project proposal",
  "status": "pending",
  "priority": 3,
  "due_date": "2023-10-15T10:00:00Z",
  "completed_at": null,
  "created_at": "2023-10-01T10:00:00Z",
  "updated_at": "2023-10-01T10:00:00Z",
  "tags": [
    {
      "id": "tag-uuid",
      "name": "work",
      "color": "#ff0000"
    }
  ]
}
```
- **Errors:**
  - 401: Unauthorized
  - 403: Forbidden (trying to access another user's todo)
  - 404: Todo not found

#### PUT /todos/{todo_id}
Update a specific todo by ID (full update)
- **Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```
- **Parameters:**
  - `todo_id`: UUID of the todo

- **Request Body:**
```json
{
  "title": "Updated project proposal",
  "description": "Revised and submit the project proposal",
  "status": "in_progress",
  "priority": 4,
  "due_date": "2023-10-20T10:00:00Z",
  "tags": ["work", "urgent"]
}
```
- **Response (200 OK):**
```json
{
  "id": "uuid-string",
  "title": "Updated project proposal",
  "description": "Revised and submit the project proposal",
  "status": "in_progress",
  "priority": 4,
  "due_date": "2023-10-20T10:00:00Z",
  "completed_at": null,
  "created_at": "2023-10-01T10:00:00Z",
  "updated_at": "2023-10-02T15:30:00Z",
  "tags": [
    {
      "id": "tag-uuid",
      "name": "work",
      "color": "#ff0000"
    },
    {
      "id": "tag-uuid-2",
      "name": "urgent",
      "color": "#ffff00"
    }
  ]
}
```
- **Errors:**
  - 401: Unauthorized
  - 403: Forbidden (trying to access another user's todo)
  - 404: Todo not found
  - 422: Validation error

#### PATCH /todos/{todo_id}
Partially update a specific todo by ID
- **Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```
- **Parameters:**
  - `todo_id`: UUID of the todo

- **Request Body (partial update):**
```json
{
  "status": "completed",
  "completed_at": "2023-10-15T14:30:00Z"
}
```
- **Response (200 OK):**
```json
{
  "id": "uuid-string",
  "title": "Complete project proposal",
  "description": "Finish and submit the project proposal",
  "status": "completed",
  "priority": 3,
  "due_date": "2023-10-15T10:00:00Z",
  "completed_at": "2023-10-15T14:30:00Z",
  "created_at": "2023-10-01T10:00:00Z",
  "updated_at": "2023-10-15T14:30:00Z",
  "tags": [
    {
      "id": "tag-uuid",
      "name": "work",
      "color": "#ff0000"
    }
  ]
}
```
- **Errors:**
  - 401: Unauthorized
  - 403: Forbidden (trying to access another user's todo)
  - 404: Todo not found
  - 422: Validation error

#### DELETE /todos/{todo_id}
Delete a specific todo by ID
- **Headers:**
```
Authorization: Bearer <jwt-token>
```
- **Parameters:**
  - `todo_id`: UUID of the todo

- **Response (204 No Content):**
```
[Empty response body]
```
- **Errors:**
  - 401: Unauthorized
  - 403: Forbidden (trying to access another user's todo)
  - 404: Todo not found

### Tag Management Endpoints

#### GET /tags
Retrieve user's tags
- **Headers:**
```
Authorization: Bearer <jwt-token>
```
- **Response (200 OK):**
```json
{
  "tags": [
    {
      "id": "tag-uuid",
      "name": "work",
      "color": "#ff0000",
      "created_at": "2023-10-01T10:00:00Z"
    },
    {
      "id": "tag-uuid-2",
      "name": "personal",
      "color": "#00ff00",
      "created_at": "2023-10-02T15:00:00Z"
    }
  ]
}
```
- **Errors:**
  - 401: Unauthorized

#### POST /tags
Create a new tag for the user
- **Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```
- **Request Body:**
```json
{
  "name": "urgent",
  "color": "#ff0000"
}
```
- **Response (201 Created):**
```json
{
  "id": "tag-uuid",
  "name": "urgent",
  "color": "#ff0000",
  "created_at": "2023-10-05T10:00:00Z"
}
```
- **Errors:**
  - 401: Unauthorized
  - 409: Tag name already exists for user
  - 422: Validation error

#### DELETE /tags/{tag_id}
Delete a tag and remove it from all associated todos
- **Headers:**
```
Authorization: Bearer <jwt-token>
```
- **Parameters:**
  - `tag_id`: UUID of the tag

- **Response (204 No Content):**
```
[Empty response body]
```
- **Errors:**
  - 401: Unauthorized
  - 403: Forbidden (trying to access another user's tag)
  - 404: Tag not found

### User Profile Endpoints

#### GET /profile
Get authenticated user's profile information
- **Headers:**
```
Authorization: Bearer <jwt-token>
```
- **Response (200 OK):**
```json
{
  "id": "user-uuid",
  "email": "user@example.com",
  "username": "johndoe",
  "first_name": "John",
  "last_name": "Doe",
  "avatar_url": "https://example.com/avatar.jpg",
  "is_active": true,
  "email_verified": true,
  "created_at": "2023-10-01T10:00:00Z",
  "updated_at": "2023-10-01T10:00:00Z"
}
```
- **Errors:**
  - 401: Unauthorized

#### PUT /profile
Update user's profile information
- **Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```
- **Request Body:**
```json
{
  "first_name": "Jane",
  "last_name": "Smith",
  "avatar_url": "https://example.com/new-avatar.jpg"
}
```
- **Response (200 OK):**
```json
{
  "id": "user-uuid",
  "email": "user@example.com",
  "username": "johndoe",
  "first_name": "Jane",
  "last_name": "Smith",
  "avatar_url": "https://example.com/new-avatar.jpg",
  "is_active": true,
  "email_verified": true,
  "created_at": "2023-10-01T10:00:00Z",
  "updated_at": "2023-10-02T12:00:00Z"
}
```
- **Errors:**
  - 401: Unauthorized
  - 422: Validation error

## Request/Response Models

### Todo Models

#### TodoCreate
```typescript
interface TodoCreate {
  title: string;
  description?: string;
  status?: "pending" | "in_progress" | "completed";
  priority?: number; // 1-5
  due_date?: string; // ISO 8601
  tags?: string[]; // Array of tag names
}
```

#### TodoUpdate
```typescript
interface TodoUpdate {
  title?: string;
  description?: string;
  status?: "pending" | "in_progress" | "completed";
  priority?: number; // 1-5
  due_date?: string; // ISO 8601
  completed_at?: string; // ISO 8601
  tags?: string[]; // Array of tag names
}
```

#### TodoResponse
```typescript
interface TodoResponse {
  id: string;
  title: string;
  description?: string;
  status: "pending" | "in_progress" | "completed";
  priority: number; // 1-5
  due_date?: string; // ISO 8601
  completed_at?: string; // ISO 8601
  created_at: string; // ISO 8601
  updated_at: string; // ISO 8601
  tags: TagResponse[];
}
```

### Tag Models

#### TagCreate
```typescript
interface TagCreate {
  name: string;
  color?: string; // Hex color code
}
```

#### TagResponse
```typescript
interface TagResponse {
  id: string;
  name: string;
  color?: string; // Hex color code
  created_at: string; // ISO 8601
}
```

### User Models

#### UserCreate
```typescript
interface UserCreate {
  email: string;
  username: string;
  password: string;
  first_name?: string;
  last_name?: string;
}
```

#### UserResponse
```typescript
interface UserResponse {
  id: string;
  email: string;
  username: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  is_active: boolean;
  email_verified: boolean;
  created_at: string; // ISO 8601
  updated_at: string; // ISO 8601
}
```

## JWT Authentication Integration

### Authentication Middleware
1. **Token Extraction**: Extract JWT from Authorization header
2. **Token Verification**: Verify token signature and validity
3. **User Context**: Inject authenticated user into request context
4. **Access Control**: Validate user permissions for requested resource

### FastAPI Dependency
```python
def get_current_user(
    token: str = Security(oauth2_scheme)
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
            audience="todo-app"
        )
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = get_user_by_id(user_id)
    if user is None:
        raise credentials_exception

    return user
```

### Endpoint Protection
```python
@app.get("/todos/{todo_id}")
async def get_todo(
    todo_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    todo = get_todo_by_id(todo_id, db)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")

    # Ensure user can only access their own todos
    if todo.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    return todo
```

## Error Handling and Validation

### HTTP Status Codes
- **200 OK**: Successful GET, PUT, PATCH requests
- **201 Created**: Successful POST requests
- **204 No Content**: Successful DELETE requests
- **400 Bad Request**: Invalid request format
- **401 Unauthorized**: Missing or invalid authentication
- **403 Forbidden**: Valid token but insufficient permissions
- **404 Not Found**: Resource does not exist
- **409 Conflict**: Resource already exists (e.g., duplicate email)
- **422 Unprocessable Entity**: Validation error
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Unexpected server error

### Error Response Format
```json
{
  "detail": "Error message describing the issue",
  "error_code": "ERROR_CODE_STRING",
  "timestamp": "2023-10-01T10:00:00Z",
  "request_id": "unique-request-identifier"
}
```

### Validation Rules
1. **Input Validation**: All inputs validated on both client and server
2. **Schema Validation**: Request bodies validated against Pydantic models
3. **Business Logic Validation**: Domain-specific validation rules applied
4. **Data Integrity**: Database constraints enforced at application level
5. **Rate Limiting**: API endpoints protected against abuse
6. **Sanitization**: User inputs sanitized to prevent injection attacks

### Error Scenarios and Handling
- **Expired JWT**: Return 401 with refresh token instructions
- **Invalid JWT**: Return 401 with authentication required message
- **Insufficient Permissions**: Return 403 with forbidden message
- **Resource Not Found**: Return 404 with clear error message
- **Validation Errors**: Return 422 with detailed field-specific errors
- **Database Errors**: Return 500 with generic error message
- **Rate Limit Exceeded**: Return 429 with retry-after header

### Logging and Monitoring
- Log all authentication attempts (success/failure)
- Monitor for suspicious API usage patterns
- Track error rates and response times
- Alert on security-relevant events