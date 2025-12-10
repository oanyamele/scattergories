import React from 'react';
import { cn } from '@/lib/utils';
import { RefreshCw } from 'lucide-react';

interface CategoryCardProps {
  category: string;
  index: number;
  answer?: string;
  onAnswerChange?: (value: string) => void;
  onRegenerate?: () => void;
  showInput?: boolean;
  disabled?: boolean;
  points?: number;
  isCorrect?: boolean;
}

const NEON_COLORS = [
  'border-neon-pink',
  'border-neon-cyan',
  'border-neon-yellow',
  'border-neon-green',
  'border-neon-orange',
  'border-neon-purple',
];

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  index,
  answer = '',
  onAnswerChange,
  onRegenerate,
  showInput = false,
  disabled = false,
  points,
  isCorrect,
}) => {
  const borderColor = NEON_COLORS[index % NEON_COLORS.length];

  return (
    <div
      className={cn(
        "bg-card border-2 rounded-xl p-4 transition-all duration-300 animate-scale-in",
        borderColor,
        !disabled && "hover:scale-[1.02]"
      )}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-muted font-arcade text-sm text-primary">
            {index + 1}
          </span>
          <h3 className="font-orbitron font-semibold text-foreground text-sm md:text-base uppercase">
            {category}
          </h3>
        </div>
        {onRegenerate && (
          <button
            onClick={onRegenerate}
            className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-muted-foreground hover:text-primary"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        )}
        {points !== undefined && (
          <span
            className={cn(
              "font-arcade text-lg",
              isCorrect ? "text-neon-green" : "text-destructive"
            )}
          >
            +{points}
          </span>
        )}
      </div>
      {showInput && (
        <input
          type="text"
          value={answer}
          onChange={(e) => onAnswerChange?.(e.target.value)}
          disabled={disabled}
          placeholder="Type your answer..."
          className={cn(
            "game-input w-full text-sm",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        />
      )}
    </div>
  );
};

export { CategoryCard };
