import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameLayout } from '@/components/layout/GameLayout';
import { PageTransition } from '@/components/layout/PageTransition';
import { GameCard } from '@/components/ui/GameCard';
import { GameButton } from '@/components/ui/GameButton';
import { GameInput } from '@/components/ui/GameInput';
import { Users, User, Gamepad2, Trophy, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [gameType, setGameType] = useState<'single' | 'multi'>('single');
  const [joinCode, setJoinCode] = useState('');

  const handleCreateGame = () => {
    if (gameType === 'single') {
      navigate('/game/new/pre-round/1');
    } else {
      navigate('/lobby/new?host=true');
    }
  };

  const handleJoinGame = () => {
    if (joinCode.trim()) {
      navigate(`/lobby/${joinCode}`);
    }
  };

  return (
    <GameLayout>
      <PageTransition>
        <div className="max-w-4xl mx-auto py-8">
          {/* Title */}
          <div className="text-center mb-12 animate-slide-in-top">
            <h1 className="font-arcade text-4xl md:text-6xl text-primary neon-text mb-4">
              SCATTERGORIES
            </h1>
            <p className="font-orbitron text-lg text-muted-foreground">
              Think fast. Be creative. Win big!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Create Game Section */}
            <GameCard variant="neon" className="animate-slide-in-bottom">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-orbitron font-bold text-xl text-foreground">
                    Create Game
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Start a new game session
                  </p>
                </div>
              </div>

              {/* Game Type Selection */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => setGameType('single')}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${
                    gameType === 'single'
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <User className={`w-6 h-6 ${gameType === 'single' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <div className="text-left">
                    <p className="font-orbitron font-semibold text-foreground">Single Player</p>
                    <p className="text-xs text-muted-foreground">Play against the clock</p>
                  </div>
                </button>

                <button
                  onClick={() => setGameType('multi')}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${
                    gameType === 'multi'
                      ? 'border-secondary bg-secondary/10'
                      : 'border-border hover:border-secondary/50'
                  }`}
                >
                  <Users className={`w-6 h-6 ${gameType === 'multi' ? 'text-secondary' : 'text-muted-foreground'}`} />
                  <div className="text-left">
                    <p className="font-orbitron font-semibold text-foreground">Multiplayer</p>
                    <p className="text-xs text-muted-foreground">Challenge your friends</p>
                  </div>
                </button>
              </div>

              <GameButton 
                onClick={handleCreateGame}
                className="w-full"
                size="lg"
                variant={gameType === 'single' ? 'primary' : 'secondary'}
                glow
              >
                Create Game
                <ArrowRight className="w-5 h-5 ml-2" />
              </GameButton>
            </GameCard>

            {/* Join Game Section */}
            <GameCard variant="neon" className="animate-slide-in-bottom" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h2 className="font-orbitron font-bold text-xl text-foreground">
                    Join Game
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Enter a game code to join
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <GameInput
                  placeholder="Enter Game Code"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  className="text-center text-xl tracking-[0.3em] uppercase"
                  maxLength={6}
                />

                <GameButton 
                  onClick={handleJoinGame}
                  className="w-full"
                  size="lg"
                  variant="accent"
                  disabled={joinCode.length < 4}
                >
                  Join Game
                  <ArrowRight className="w-5 h-5 ml-2" />
                </GameButton>
              </div>

              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground font-orbitron uppercase mb-3">
                  Your Stats
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="font-arcade text-2xl text-primary">0</p>
                    <p className="text-xs text-muted-foreground">Games</p>
                  </div>
                  <div className="text-center">
                    <p className="font-arcade text-2xl text-neon-green">0</p>
                    <p className="text-xs text-muted-foreground">Wins</p>
                  </div>
                  <div className="text-center">
                    <p className="font-arcade text-2xl text-accent">0</p>
                    <p className="text-xs text-muted-foreground">High Score</p>
                  </div>
                </div>
              </div>
            </GameCard>
          </div>

          {/* How to Play Section */}
          <GameCard variant="subtle" className="mt-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-orbitron font-bold text-lg text-foreground mb-4 text-center">
              How to Play
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                  <span className="font-arcade text-primary">1</span>
                </div>
                <p className="font-orbitron text-sm text-foreground">Get a Letter & Categories</p>
                <p className="text-xs text-muted-foreground">
                  You'll receive a random letter and 6 categories
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto">
                  <span className="font-arcade text-secondary">2</span>
                </div>
                <p className="font-orbitron text-sm text-foreground">Think Fast!</p>
                <p className="text-xs text-muted-foreground">
                  You have 60 seconds to fill in answers
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
                  <span className="font-arcade text-accent">3</span>
                </div>
                <p className="font-orbitron text-sm text-foreground">Score Points</p>
                <p className="text-xs text-muted-foreground">
                  Unique answers earn more points!
                </p>
              </div>
            </div>
          </GameCard>
        </div>
      </PageTransition>
    </GameLayout>
  );
};

export default Home;
