import React, { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { GameLayout } from '@/components/layout/GameLayout';
import { PageTransition } from '@/components/layout/PageTransition';
import { GameCard } from '@/components/ui/GameCard';
import { GameButton } from '@/components/ui/GameButton';
import { PlayerCard } from '@/components/ui/PlayerCard';
import { Copy, Check, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Lobby: React.FC = () => {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const [searchParams] = useSearchParams();
  const isHost = searchParams.get('host') === 'true';
  const { toast } = useToast();
  
  const [copied, setCopied] = useState(false);
  const gameCode = gameId === 'new' ? 'ABC123' : gameId?.toUpperCase() || 'UNKNOWN';

  // Mock players data
  const [players] = useState([
    { id: '1', name: 'Player 1 (You)', isHost: isHost, isReady: true },
    { id: '2', name: 'Player 2', isHost: !isHost, isReady: false },
  ]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(gameCode);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Game code copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartGame = () => {
    navigate(`/game/${gameCode}/pre-round/1`);
  };

  const handleLeaveGame = () => {
    navigate('/');
  };

  return (
    <GameLayout>
      <PageTransition>
        <div className="max-w-2xl mx-auto py-8">
          {/* Header */}
          <div className="text-center mb-8 animate-slide-in-top">
            <h1 className="font-arcade text-3xl md:text-4xl text-primary neon-text mb-2">
              GAME LOBBY
            </h1>
            <p className="font-orbitron text-muted-foreground">
              {isHost ? 'Waiting for players to join...' : 'Waiting for host to start...'}
            </p>
          </div>

          {/* Game Code Display */}
          <GameCard variant="neon" className="mb-8 animate-scale-in">
            <div className="text-center">
              <p className="font-orbitron text-sm text-muted-foreground uppercase mb-2">
                Game Code
              </p>
              <div className="flex items-center justify-center gap-4">
                <p className="font-arcade text-4xl md:text-5xl text-secondary neon-text-cyan tracking-[0.3em]">
                  {gameCode}
                </p>
                <button
                  onClick={handleCopyCode}
                  className="p-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                >
                  {copied ? (
                    <Check className="w-6 h-6 text-neon-green" />
                  ) : (
                    <Copy className="w-6 h-6 text-muted-foreground" />
                  )}
                </button>
              </div>
              <p className="font-orbitron text-xs text-muted-foreground mt-4">
                Share this code with your friends to join!
              </p>
            </div>
          </GameCard>

          {/* Players List */}
          <GameCard variant="default" className="mb-8 animate-slide-in-bottom">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="font-orbitron font-bold text-xl text-foreground">
                Players ({players.length}/2)
              </h2>
            </div>

            <div className="space-y-3">
              {players.map((player, index) => (
                <div
                  key={player.id}
                  className="animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PlayerCard
                    name={player.name}
                    isHost={player.isHost}
                    isReady={player.isReady}
                  />
                </div>
              ))}
            </div>
          </GameCard>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <GameButton
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={handleLeaveGame}
            >
              Leave Game
            </GameButton>

            {isHost ? (
              <GameButton
                variant="primary"
                size="lg"
                className="flex-1"
                onClick={handleStartGame}
                glow
                disabled={players.length < 2}
              >
                Start Game
              </GameButton>
            ) : (
              <GameButton
                variant="secondary"
                size="lg"
                className="flex-1"
                disabled
              >
                Waiting for Host...
              </GameButton>
            )}
          </div>
        </div>
      </PageTransition>
    </GameLayout>
  );
};

export default Lobby;
