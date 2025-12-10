import React from 'react';
import { cn } from '@/lib/utils';

interface GameButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  children: React.ReactNode;
}

const GameButton = React.forwardRef<HTMLButtonElement, GameButtonProps>(
  ({ className, variant = 'primary', size = 'md', glow = false, children, ...props }, ref) => {
    const baseStyles = "font-orbitron font-bold uppercase tracking-wider transition-all duration-200 rounded-xl border-2 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      primary: "bg-primary text-primary-foreground border-primary hover:bg-primary/80 hover:scale-105",
      secondary: "bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/80 hover:scale-105",
      accent: "bg-accent text-accent-foreground border-accent hover:bg-accent/80 hover:scale-105",
      outline: "bg-transparent text-primary border-primary hover:bg-primary/10 hover:scale-105",
      ghost: "bg-transparent text-foreground border-transparent hover:bg-muted hover:scale-105",
    };

    const sizes = {
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    };

    const glowStyles = glow ? "animate-pulse-glow" : "";

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], glowStyles, className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

GameButton.displayName = 'GameButton';

export { GameButton };
