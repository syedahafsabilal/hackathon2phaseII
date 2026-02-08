import * as React from 'react';
import { cn } from '../../lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  style?: React.CSSProperties;
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

export const Modal = ({ isOpen, onClose, title, children, size = 'md', style }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
      style={style}
    >
      <div
        className={`relative w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto rounded-lg bg-background p-6 shadow-lg`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-foreground" id="modal-headline">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};