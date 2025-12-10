import React from 'react';
import { cn } from '@/lib/utils';

interface LetterBadgeProps {
  letter: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const LetterBadge: React.FC<LetterBadgeProps> = ({ 
  letter, 
  size = 'lg',
  animated = true 
}) => {
  const sizes = {
    sm: 'w-12 h-12 text-xl',
    md: 'w-20 h-20 text-3xl',
    lg: 'w-28 h-28 md:w-36 md:h-36 text-5xl md:text-7xl',
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-neon-purple to-secondary font-arcade font-bold text-primary-foreground",
        sizes[size],
        animated && "animate-float",
        "shadow-[0_0_30px_hsl(var(--primary)/0.5),inset_0_0_20px_hsl(var(--foreground)/0.1)]"
      )}
    >
      {letter}
    </div>
  );
};

export { LetterBadge };
