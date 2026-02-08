# Todo Application Frontend Planning Document

## Overview

This document outlines the frontend architecture for the Todo application built with React and TypeScript. The design focuses on user experience, responsive layouts, and seamless API integration using JWT tokens. The frontend follows modern UI/UX principles and is designed to accommodate future AI features.

## Page Structure

### 1. Login Page (`/login`)

#### Components Used
- LoginForm
- AuthLayout
- InputField
- Button
- Link

#### Layout Structure
```
┌─────────────────────────────────────┐
│            AuthLayout               │
├─────────────────────────────────────┤
│                                     │
│         App Logo/Branding           │
│                                     │
│        ┌─────────────────┐          │
│        │   LoginForm     │          │
│        │                 │          │
│        │  Email Field    │          │
│        │  Password Field │          │
│        │  Submit Button  │          │
│        │                 │          │
│        │ Forgot Password │          │
│        │ Sign Up Link    │          │
│        └─────────────────┘          │
│                                     │
└─────────────────────────────────────┘
```

#### Functionality
- Email/Username and password input fields
- Form validation with real-time feedback
- "Remember me" checkbox
- Forgot password link
- Sign up link
- Loading states during authentication
- Error messaging for failed login attempts

### 2. Signup Page (`/signup`)

#### Components Used
- SignupForm
- AuthLayout
- InputField
- Button
- Link

#### Layout Structure
```
┌─────────────────────────────────────┐
│            AuthLayout               │
├─────────────────────────────────────┤
│                                     │
│         App Logo/Branding           │
│                                     │
│        ┌─────────────────┐          │
│        │  SignupForm     │          │
│        │                 │          │
│        │  Email Field    │          │
│        │  Username Field │          │
│        │  Password Field │          │
│        │  Confirm Pass   │          │
│        │  Submit Button  │          │
│        │                 │          │
│        │ Login Link      │          │
│        └─────────────────┘          │
│                                     │
└─────────────────────────────────────┘
```

#### Functionality
- Email, username, and password input fields
- Password confirmation validation
- Form validation with real-time feedback
- Terms of service acceptance
- Login link
- Loading states during registration
- Success/error messaging

### 3. Dashboard Page (`/dashboard`)

#### Components Used
- Sidebar
- Header
- TaskList
- TaskCard
- CreateTaskButton
- FilterControls
- UserProfileDropdown

#### Layout Structure
```
┌─────────────────────────────────────┐
│              Header                 │
│  ┌─────────┐  ┌─────────────────┐   │
│  │Sidebar  │  │  Main Content   │   │
│  │         │  │                 │   │
│  │Nav Links│  │  ┌───────────┐  │   │
│  │         │  │  │FilterCtrls│  │   │
│  │         │  │  └───────────┘  │   │
│  │         │  │                 │   │
│  │         │  │  ┌───────────┐  │   │
│  │         │  │  │  TaskList │  │   │
│  │         │  │  │           │  │   │
│  │         │  │  │  TaskCard │  │   │
│  │         │  │  │  TaskCard │  │   │
│  │         │  │  │  ...      │  │   │
│  │         │  │  └───────────┘  │   │
│  │         │  │                 │   │
│  └─────────┘  └─────────────────┘   │
└─────────────────────────────────────┘
```

#### Functionality
- Navigation sidebar with menu items
- Top header with user profile and notifications
- Task filtering controls (status, priority, due date)
- Search functionality
- Create new task button
- Task list with infinite scrolling
- Task cards with status indicators
- Drag-and-drop reordering
- Empty state visualization

## Reusable Components

### 1. Button Component

#### Props Interface
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  children: React.ReactNode;
}
```

#### Variants
- Primary: Main actions (create, save, submit)
- Secondary: Secondary actions (cancel, back)
- Danger: Destructive actions (delete, remove)
- Outline: Subtle actions (learn more, view details)

### 2. InputField Component

#### Props Interface
```typescript
interface InputFieldProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'date' | 'number';
  value: string;
  onChange: (value: string) => void;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
}
```

#### Features
- Label with floating animation
- Error state with validation messages
- Helper text for additional context
- Password visibility toggle
- Auto-complete attributes

### 3. TaskCard Component

#### Props Interface
```typescript
interface TaskCardProps {
  task: TodoResponse;
  onStatusChange?: (taskId: string, newStatus: string) => void;
  onEdit?: (task: TodoResponse) => void;
  onDelete?: (taskId: string) => void;
  onToggle?: (taskId: string) => void;
}
```

#### Features
- Title with truncation for long text
- Status indicator with color coding
- Priority badge with visual hierarchy
- Due date display with overdue highlighting
- Tags display with color coding
- Completion checkbox
- Action dropdown menu (edit, delete)
- Drag handle for reordering

### 4. Modal Component

#### Props Interface
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
```

#### Features
- Backdrop overlay with click-to-close
- Keyboard navigation (ESC to close)
- Focus trap for accessibility
- Responsive sizing
- Customizable header/footer

### 5. Dropdown Component

#### Props Interface
```typescript
interface DropdownProps {
  trigger: React.ReactNode;
  options: Array<{
    label: string;
    value: string;
    icon?: React.ReactNode;
  }>;
  onSelect: (value: string) => void;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}
```

#### Features
- Customizable trigger element
- Icon support for options
- Keyboard navigation
- Position adjustment based on viewport
- Click outside to close

### 6. TagPill Component

#### Props Interface
```typescript
interface TagPillProps {
  tag: TagResponse;
  removable?: boolean;
  onRemove?: (tagId: string) => void;
}
```

#### Features
- Color-coded background based on tag color
- Removable option with close button
- Consistent styling across the app
- Hover effects

### 7. LoadingSpinner Component

#### Props Interface
```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  label?: string;
}
```

#### Features
- Different sizes for various contexts
- Accessible with proper ARIA labels
- Optional text label

### 8. Alert Component

#### Props Interface
```typescript
interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
  duration?: number;
}
```

#### Features
- Auto-dismiss functionality
- Close button option
- Color-coded for different types
- Smooth animations

## API Integration Notes Using JWT

### Authentication Flow

#### 1. Token Storage
- Store JWT access token in browser memory (not localStorage for security)
- Store refresh token in HttpOnly cookie via backend
- Implement token expiration handling

#### 2. Axios Interceptor Setup
```typescript
// Request interceptor to add auth header
axios.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;

      // Attempt token refresh
      const newToken = await refreshToken();
      if (newToken) {
        // Retry original request with new token
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        return axios(error.config);
      } else {
        // Redirect to login if refresh fails
        redirectToLogin();
      }
    }
    return Promise.reject(error);
  }
);
```

#### 3. API Service Functions
```typescript
// Example API service
const todoApi = {
  getTodos: (filters?: TodoFilters) =>
    axios.get('/todos', { params: filters }),

  createTodo: (data: TodoCreate) =>
    axios.post('/todos', data),

  updateTodo: (id: string, data: TodoUpdate) =>
    axios.put(`/todos/${id}`, data),

  deleteTodo: (id: string) =>
    axios.delete(`/todos/${id}`)
};
```

#### 4. React Query Integration
```typescript
// Example React Query setup
export const useTodos = (filters?: TodoFilters) => {
  return useQuery({
    queryKey: ['todos', filters],
    queryFn: () => todoApi.getTodos(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCreateTodo = () => {
  return useMutation({
    mutationFn: (data: TodoCreate) => todoApi.createTodo(data),
    onSuccess: () => {
      // Invalidate todos query to refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
```

### Error Handling Strategy
- Centralized error handling with user-friendly messages
- Automatic retry for network failures
- Specific handling for 401 (unauthorized) responses
- Global error boundary for unexpected errors

### Loading States
- Skeleton screens during initial load
- Optimistic updates for immediate feedback
- Progress indicators for long-running operations

## Responsive Design Strategy

### Breakpoint Definitions
- Mobile: 0px - 639px
- Tablet: 640px - 1023px
- Desktop: 1024px - 1279px
- Large Desktop: 1280px+

### Responsive Components

#### 1. Dashboard Layout
- Mobile: Single column layout with collapsible sidebar
- Tablet: Sidebar becomes drawer that can be toggled
- Desktop: Permanent sidebar with main content area

#### 2. Task Cards
- Mobile: Full-width cards with vertical layout
- Tablet: Two-column grid layout
- Desktop: Three-column grid layout (adjustable)

#### 3. Forms
- Mobile: Single-column layout with stacked elements
- Tablet: Two-column layout for related fields
- Desktop: Multi-column layout with advanced options

#### 4. Navigation
- Mobile: Bottom navigation bar with hamburger menu
- Tablet: Side navigation with icons and text
- Desktop: Expanded sidebar with full text labels

### Touch-Friendly Design
- Minimum 44px touch targets
- Swipe gestures for task actions
- Visual feedback for touch interactions
- Accessible focus states

## Future AI UI Features

### 1. Smart Suggestions Panel
- Location: Right sidebar in dashboard
- Functionality: AI-powered task suggestions based on user behavior
- UI Elements:
  - Collapsible panel with "AI Assistant" header
  - Suggested tasks with accept/reject buttons
  - Confidence indicators
  - Explanation of suggestions

### 2. Natural Language Input
- Location: Enhanced task creation modal
- Functionality: Parse natural language input (e.g., "Meeting with John tomorrow at 3pm")
- UI Elements:
  - Text input with "AI parsing" indicator
  - Preview of parsed information
  - Manual override options
  - "Confirm" button to accept parsed data

### 3. Intelligent Prioritization
- Location: Task card priority selector
- Functionality: AI suggests priority levels based on due dates and importance
- UI Elements:
  - Priority dropdown with AI recommendation badges
  - "Apply AI Suggestion" button
  - Priority heatmap visualization

### 4. Productivity Insights Dashboard
- Location: New "Insights" page/tab
- Functionality: Analytics on user productivity patterns
- UI Elements:
  - Charts showing completion rates
  - Time-of-day productivity analysis
  - Category-based performance metrics
  - Goal-setting interface

### 5. Voice Commands Integration
- Location: Floating action button in dashboard
- Functionality: Voice-to-task creation
- UI Elements:
  - Microphone icon button
  - Listening state animation
  - Transcription display
  - Confirmation step

### 6. AI-Powered Search
- Location: Enhanced search bar
- Functionality: Semantic search across tasks and tags
- UI Elements:
  - Search bar with AI indicator
  - Suggested search terms
  - Filter chips for semantic categories
  - Relevance scoring display

## Accessibility Features

### ARIA Labels and Roles
- Proper labeling for all interactive elements
- Semantic HTML structure
- Screen reader compatibility
- Keyboard navigation support

### Color Contrast
- WCAG AA compliance for text contrast
- High contrast mode support
- Color-blind friendly palettes
- Alternative indicators beyond color

### Focus Management
- Logical tab order
- Visible focus indicators
- Focus trapping in modals
- Skip links for navigation

## Performance Considerations

### Code Splitting
- Route-based code splitting
- Component lazy loading
- Dynamic imports for heavy libraries

### Image Optimization
- Next.js Image component for optimization
- WebP format support
- Lazy loading for below-fold content
- Responsive image sizes

### Caching Strategy
- React Query for API response caching
- Service worker for offline functionality
- Browser caching headers for static assets
- CDN for global asset delivery

## Internationalization (i18n)
- Translation key management
- RTL layout support
- Date/time localization
- Number/currency formatting