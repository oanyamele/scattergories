import React from 'react';
import { cn } from '@/lib/utils';

interface GameCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'neon' | 'subtle';
  children: React.ReactNode;
}

const GameCard = React.forwardRef<HTMLDivElement, GameCardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: "arcade-card",
      neon: "arcade-card neon-box",
      subtle: "bg-card/50 border border-border rounded-2xl p-6",
    };

    return (
      <div
        ref={ref}
        className={cn(variants[variant], "animate-fade-in", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GameCard.displayName = 'GameCard';

export { GameCard };
