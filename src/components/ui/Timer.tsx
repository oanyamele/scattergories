import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TimerProps {
  seconds: number;
  onComplete?: () => void;
  isRunning?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Timer: React.FC<TimerProps> = ({ 
  seconds: initialSeconds, 
  onComplete, 
  isRunning = true,
  size = 'lg' 
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (!isRunning || seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, onComplete, seconds]);

  const getColor = () => {
    if (seconds <= 10) return 'text-destructive';
    if (seconds <= 30) return 'text-accent';
    return 'text-secondary';
  };

  const getGlow = () => {
    if (seconds <= 10) return 'drop-shadow-[0_0_15px_hsl(var(--destructive))]';
    if (seconds <= 30) return 'drop-shadow-[0_0_15px_hsl(var(--accent))]';
    return 'drop-shadow-[0_0_15px_hsl(var(--secondary))]';
  };

  const sizes = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl md:text-8xl',
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          "font-arcade font-bold transition-all duration-300",
          sizes[size],
          getColor(),
          getGlow(),
          seconds <= 10 && isRunning && "animate-countdown"
        )}
      >
        {formatTime(seconds)}
      </div>
      <div className="w-full max-w-xs h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full transition-all duration-1000 ease-linear rounded-full",
            seconds <= 10 ? "bg-destructive" : seconds <= 30 ? "bg-accent" : "bg-secondary"
          )}
          style={{ width: `${(seconds / initialSeconds) * 100}%` }}
        />
      </div>
    </div>
  );
};

export { Timer };
