import React from 'react';
import { cn } from '@/lib/utils';

interface GameInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

const GameInput = React.forwardRef<HTMLInputElement, GameInputProps>(
  ({ className, label, error, leftIcon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-orbitron text-muted-foreground mb-2 uppercase tracking-wider">
            {label}
          </label>
        )}

        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          className={cn(
            "w-full h-12 font-orbitron text-sm px-3",
            leftIcon ? "pl-12" : "pl-3",
            error && "border-destructive focus:border-destructive",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-destructive font-orbitron">{error}</p>
        )}
      </div>
    );
  }
);

GameInput.displayName = 'GameInput';

export { GameInput };
