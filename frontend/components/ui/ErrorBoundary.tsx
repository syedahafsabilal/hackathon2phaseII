import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error | null }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultFallback;
      return <FallbackComponent error={this.state.error || null} />;
    }

    return this.props.children;
  }
}

const DefaultFallback: React.FC<{ error: Error | null }> = ({ error }) => (
  <div className="p-8 text-center">
    <h2 className="text-xl font-bold text-destructive mb-2">Something went wrong</h2>
    <p className="text-muted-foreground mb-4">
      {error?.message || 'An unexpected error occurred'}
    </p>
    <button
      className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      onClick={() => window.location.reload()}
    >
      Reload Page
    </button>
  </div>
);

export default ErrorBoundary;