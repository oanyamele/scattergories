import React from 'react';
import { cn } from '@/lib/utils';
import { GameHeader } from './GameHeader';

interface GameLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  className?: string;
}

const GameLayout: React.FC<GameLayoutProps> = ({ 
  children, 
  showHeader = true,
  className 
}) => {
  return (
    <div className="min-h-screen bg-background retro-grid relative overflow-hidden">
      {/* Scanlines overlay */}
      <div className="fixed inset-0 scanlines pointer-events-none z-10" />
      
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-background via-background to-primary/5 pointer-events-none" />
      
      {showHeader && <GameHeader />}
      
      <main className={cn(
        "relative z-0 container mx-auto px-4 py-6",
        showHeader && "pt-20",
        className
      )}>
        {children}
      </main>
    </div>
  );
};

export { GameLayout };
