import React from 'react';
import { cn } from '@/lib/utils';

interface GameInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const GameInput = React.forwardRef<HTMLInputElement, GameInputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-orbitron text-muted-foreground mb-2 uppercase tracking-wider">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "game-input w-full font-orbitron",
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
