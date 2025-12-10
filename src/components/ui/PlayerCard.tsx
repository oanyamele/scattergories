import React from 'react';
import { cn } from '@/lib/utils';
import { Crown, User } from 'lucide-react';

interface PlayerCardProps {
  name: string;
  isHost?: boolean;
  isReady?: boolean;
  score?: number;
  isWinner?: boolean;
  avatar?: string;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  name,
  isHost = false,
  isReady = false,
  score,
  isWinner = false,
  avatar,
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300",
        isWinner 
          ? "border-accent bg-accent/10 animate-pulse-glow" 
          : "border-border bg-card hover:border-primary/50"
      )}
    >
      <div className="relative">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          {avatar ? (
            <img src={avatar} alt={name} className="w-full h-full rounded-full object-cover" />
          ) : (
            <User className="w-6 h-6 text-primary-foreground" />
          )}
        </div>
        {isHost && (
          <Crown className="absolute -top-2 -right-2 w-5 h-5 text-accent" />
        )}
      </div>
      <div className="flex-1">
        <p className="font-orbitron font-semibold text-foreground">{name}</p>
        {isReady !== undefined && (
          <p className={cn(
            "text-xs font-orbitron uppercase",
            isReady ? "text-neon-green" : "text-muted-foreground"
          )}>
            {isReady ? "Ready" : "Waiting..."}
          </p>
        )}
      </div>
      {score !== undefined && (
        <div className="text-right">
          <p className="font-arcade text-2xl text-primary">{score}</p>
          <p className="text-xs text-muted-foreground font-orbitron uppercase">Points</p>
        </div>
      )}
      {isWinner && (
        <div className="text-accent font-arcade text-sm animate-bounce-in">
          WINNER!
        </div>
      )}
    </div>
  );
};

export { PlayerCard };
