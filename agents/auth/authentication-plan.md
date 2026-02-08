# Todo Application Authentication & Security Plan

## Overview

This document outlines the authentication and security architecture for the Todo application. It covers user signup/signin flows, JWT token management, data isolation, and security best practices.

## User Signup/Signin Flow

### Registration Process
1. **User Registration Request**
   - User submits email, username, and password through frontend form
   - Frontend validates input format (email format, password strength)
   - Frontend sends POST request to `/auth/register` endpoint

2. **Backend Validation & Processing**
   - Backend validates input data format and business rules
   - Backend checks for duplicate email/username
   - Backend hashes password using bcrypt (12 rounds)
   - Backend creates user record in database
   - Backend generates email verification token
   - Backend sends verification email

3. **Email Verification**
   - User clicks verification link in email
   - Backend validates verification token
   - Backend updates user account to verified status
   - User can now access full application features

### Signin Process
1. **Authentication Request**
   - User submits email/username and password through frontend form
   - Frontend sends POST request to `/auth/login` endpoint
   - Request includes device information and IP address

2. **Backend Authentication**
   - Backend retrieves user record by email/username
   - Backend compares provided password with stored hash
   - Backend validates account status (active, verified)
   - Backend checks for suspicious activity or account lockout

3. **JWT Token Generation**
   - Backend generates JWT access token with claims:
     - `sub`: user ID
     - `email`: user email
     - `username`: user username
     - `exp`: expiration timestamp (1 hour)
     - `iat`: issued at timestamp
     - `jti`: unique token identifier
   - Backend generates refresh token (UUID) stored in database
   - Backend returns both tokens to frontend

## JWT Issuance and Verification

### JWT Access Token Structure
```
{
  "alg": "RS256",
  "typ": "JWT"
}
{
  "sub": "user-id-uuid",
  "email": "user@example.com",
  "username": "username",
  "exp": 1699123456,
  "iat": 1699119856,
  "jti": "token-unique-id",
  "scope": ["read:todos", "write:todos", "manage:account"]
}
```

### JWT Issuance Process
1. **Token Signing**
   - Backend uses RS256 algorithm with RSA private key
   - Private key stored securely in environment variables
   - Public key available for verification by other services

2. **Token Storage**
   - Access token returned in HTTP response
   - Refresh token stored in secure database table
   - Both tokens stored in HttpOnly, Secure, SameSite=strict cookies
   - Alternative: frontend stores in memory (not localStorage for security)

### JWT Verification Process
1. **Middleware Implementation**
   - FastAPI dependency: `get_current_user()`
   - Extracts JWT from Authorization header (`Bearer <token>`)
   - Verifies token signature using public key
   - Validates token expiration and issuer
   - Checks token revocation status against database

2. **Verification Steps**
   ```
   def verify_jwt_token(token: str) -> User:
       # Decode token without verification first
       decoded_header = jwt.get_unverified_header(token)

       # Verify signature with public key
       payload = jwt.decode(
           token,
           public_key,
           algorithms=["RS256"],
           audience="todo-app",
           leeway=30  # 30 seconds leeway for clock skew
       )

       # Validate claims
       if payload["exp"] < time.time():
           raise HTTPException(status_code=401, detail="Token expired")

       # Check if token is revoked
       if is_token_revoked(payload["jti"]):
           raise HTTPException(status_code=401, detail="Token revoked")

       # Retrieve user from database
       user = get_user_by_id(payload["sub"])
       if not user or not user.is_active:
           raise HTTPException(status_code=401, detail="Invalid user")

       return user
   ```

## Backend Task Filtering Per User

### Data Isolation Strategy
1. **User Context Injection**
   - All protected endpoints require authenticated user
   - User context injected via FastAPI dependency
   - User ID available in all request handlers

2. **Database Query Filtering**
   ```python
   # Example: Get user's todos
   def get_user_todos(user_id: UUID, db: Session) -> List[Todo]:
       return db.query(Todo).filter(Todo.user_id == user_id).all()

   # Example: Create todo for user
   def create_todo_for_user(todo_data: TodoCreate, user_id: UUID, db: Session) -> Todo:
       todo = Todo(**todo_data.dict(), user_id=user_id)
       db.add(todo)
       db.commit()
       db.refresh(todo)
       return todo
   ```

3. **Authorization Middleware**
   - Route-level protection using JWT verification
   - Resource-level authorization checks
   - Prevents unauthorized access to other users' data

### API Endpoint Protection
```
GET /api/todos/          # Protected: Returns only user's todos
POST /api/todos/         # Protected: Creates todo for authenticated user
GET /api/todos/{id}      # Protected: Returns only if todo belongs to user
PUT /api/todos/{id}      # Protected: Updates only if todo belongs to user
DELETE /api/todos/{id}   # Protected: Deletes only if todo belongs to user
```

### Row-Level Security
- Database-level constraints prevent cross-user data access
- Foreign key relationships enforce data ownership
- Application-level checks provide additional security layer

## Security Best Practices

### Authentication Security
1. **Password Requirements**
   - Minimum 12 characters
   - Mixed case, numbers, special characters
   - Checked against common password databases
   - Rate limiting on failed attempts

2. **Session Management**
   - Short-lived access tokens (1 hour)
   - Long-lived refresh tokens (30 days)
   - Refresh token rotation on use
   - Device-specific refresh tokens

3. **Account Security**
   - Account lockout after 5 failed attempts
   - Suspicious activity monitoring
   - Password reset tokens expire after 1 hour
   - Email verification required for account activation

### Token Security
1. **Storage Security**
   - Access tokens in memory (frontend) or HttpOnly cookies
   - Refresh tokens in HttpOnly, Secure cookies
   - Never store tokens in localStorage/sessionStorage

2. **Token Lifecycle**
   - Automatic token refresh 5 minutes before expiration
   - Refresh token invalidation on logout
   - Token revocation on password change
   - Compromised token detection and revocation

### API Security
1. **Rate Limiting**
   - Per-user rate limits on authentication endpoints
   - Global rate limits on all API endpoints
   - Adaptive rate limiting based on usage patterns

2. **Input Validation**
   - All inputs validated on both frontend and backend
   - SQL injection prevention through parameterized queries
   - XSS prevention through output encoding
   - Content-Type validation for all requests

### Data Protection
1. **Encryption**
   - TLS 1.3 for all communications
   - AES-256 encryption for sensitive data at rest
   - Password hashing with bcrypt (12 rounds)
   - JWT signing with RS256

2. **Audit Logging**
   - Log all authentication attempts
   - Track user access to resources
   - Monitor for suspicious activities
   - Retain logs for security analysis

### Error Handling
- Generic error messages to prevent information disclosure
- Detailed logging for debugging without exposing to users
- Proper HTTP status codes for different error conditions
- No sensitive information in error responses

## Future Enhancements

### Multi-Factor Authentication
- TOTP-based 2FA using authenticator apps
- SMS backup codes
- Recovery codes for account access

### Advanced Security Features
- Biometric authentication integration
- Device fingerprinting
- Behavioral analysis for anomaly detection
- Zero-knowledge authentication for sensitive operations

## Compliance Considerations

### Privacy Regulations
- GDPR compliance for EU users
- CCPA compliance for California residents
- Data minimization principles
- Right to deletion implementation

### Industry Standards
- OWASP Top 10 security considerations
- NIST Cybersecurity Framework alignment
- SOC 2 Type II compliance preparation