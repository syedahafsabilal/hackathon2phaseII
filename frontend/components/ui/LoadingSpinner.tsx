import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <>
      <style>{`@keyframes orbitSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    <svg
      className={`${sizeClasses[size]} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      style={{ filter: 'drop-shadow(0 0 6px #38bdf8) drop-shadow(0 0 14px #0284c7)', overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="trackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <radialGradient id="ballGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#0284c7" />
        </radialGradient>
      </defs>

      {/* Track ring */}
      <circle cx="12" cy="12" r="10" stroke="url(#trackGrad)" strokeWidth="2.5" fill="none" />

      {/* Spinning arc */}
      <g style={{ animation: 'orbitSpin 1s linear infinite', transformOrigin: '50% 50%', transformBox: 'view-box' }}>
        <path
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          fill="url(#arcGrad)"
        />
      </g>

      {/* Orbiting glowing ball — fast */}
      <g style={{ animation: 'orbitSpin 0.4s linear infinite', transformOrigin: '50% 50%', transformBox: 'view-box' }}>
        <circle cx="12" cy="2" r="2.8" fill="url(#ballGrad)" />
        <circle cx="12" cy="2" r="2.8" fill="#ffffff" opacity="0.5" />
        <circle cx="12" cy="2" r="4" fill="#38bdf8" opacity="0.15" />
      </g>
    </svg>
    </>
  );
};

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  children,
  message = 'Loading...'
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] p-8">
        <LoadingSpinner size="lg" className="text-primary mb-4" />
        <p className="text-muted-foreground">{message}</p>
      </div>
    );
  }

  return <>{children}</>;
};