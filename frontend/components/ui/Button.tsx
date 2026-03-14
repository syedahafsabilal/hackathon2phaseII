import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 !text-white animate-glitter active:scale-[0.98]',
  {
    variants: {
      variant: {
        default: '!text-white',
        destructive: '!text-white',
        outline: 'border border-blue-500/40 !text-white',
        secondary: '!text-white',
        ghost: '!text-white',
        link: 'underline-offset-4 hover:underline !text-white',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 rounded-lg px-4',
        lg: 'h-12 rounded-xl px-10',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, style, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        style={{
          background: 'linear-gradient(135deg, #0F1B4C 0%, #1E3A8A 40%, #2563EB 60%, #1E3A8A 80%, #0F1B4C 100%)',
          backgroundSize: '300% 300%',
          boxShadow: '0 8px 24px rgba(30,58,138,0.6), 0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.2)',
          color: '#ffffff',
          ...style,
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px) scale(1.02)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            '0 12px 36px rgba(30,58,138,0.8), 0 6px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.2)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0) scale(1)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            '0 8px 24px rgba(30,58,138,0.6), 0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.2)';
        }}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };