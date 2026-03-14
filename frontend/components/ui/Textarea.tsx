import * as React from 'react';
import { cn } from '../../lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, style, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[90px] w-full rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 resize-none',
          className
        )}
        style={{
          background: 'linear-gradient(145deg, rgb(10,16,38) 0%, rgb(20,32,60) 100%)',
          border: '1px solid rgba(59,130,246,0.25)',
          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.5), inset 0 1px 2px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.04)',
          color: '#ffffff',
          textAlign: 'left',
          ...style,
        }}
        onFocus={e => {
          e.currentTarget.style.border = '1px solid rgba(59,130,246,0.6)';
          e.currentTarget.style.boxShadow = 'inset 0 2px 8px rgba(0,0,0,0.5), 0 0 0 3px rgba(59,130,246,0.15), 0 1px 0 rgba(255,255,255,0.05)';
        }}
        onBlur={e => {
          e.currentTarget.style.border = '1px solid rgba(59,130,246,0.25)';
          e.currentTarget.style.boxShadow = 'inset 0 2px 8px rgba(0,0,0,0.5), inset 0 1px 2px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.04)';
        }}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
