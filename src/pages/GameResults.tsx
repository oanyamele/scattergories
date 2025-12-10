import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { GameLayout } from '@/components/layout/GameLayout';
import { PageTransition } from '@/components/layout/PageTransition';
import { GameCard } from '@/components/ui/GameCard';
import { GameButton } from '@/components/ui/GameButton';
import { PlayerCard } from '@/components/ui/PlayerCard';
import { Confetti } from '@/components/ui/Confetti';
import { Home, RotateCcw, Trophy } from 'lucide-react';

interface RoundScore {
  round: number;
  score: number;
}

const GameResults: React.FC = () => {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const location = useLocation();
  const { isSinglePlayer = true } = (location.state as any) || {};

  const [showConfetti, setShowConfetti] = useState(true);

  // Mock data - in real app this would come from game state
  const playerScores = isSinglePlayer
    ? [
        {
          name: 'You',
          rounds: [
            { round: 1, score: 12 },
            { round: 2, score: 15 },
            { round: 3, score: 10 },
          ] as RoundScore[],
          total: 37,
          isWinner: true,
        },
      ]
    : [
        {
          name: 'Player 1 (You)',
          rounds: [
            { round: 1, score: 12 },
            { round: 2, score: 15 },
            { round: 3, score: 10 },
          ] as RoundScore[],
          total: 37,
          isWinner: true,
        },
        {
          name: 'Player 2',
          rounds: [
            { round: 1, score: 10 },
            { round: 2, score: 12 },
            { round: 3, score: 8 },
          ] as RoundScore[],
          total: 30,
          isWinner: false,
        },
      ];

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handlePlayAgain = () => {
    navigate('/');
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <GameLayout>
      <PageTransition>
        <Confetti isActive={showConfetti} />
        
        <div className="max-w-4xl mx-auto py-8">
          {/* Header */}
          <div className="text-center mb-8 animate-slide-in-top">
            <Trophy className="w-16 h-16 text-accent mx-auto mb-4 animate-bounce-in" />
            <h1 className="font-arcade text-3xl md:text-5xl text-primary neon-text mb-2">
              GAME OVER
            </h1>
            <p className="font-orbitron text-lg text-muted-foreground">
              {isSinglePlayer ? 'Great job!' : `${playerScores.find(p => p.isWinner)?.name} wins!`}
            </p>
          </div>

          {/* Final Scores */}
          {!isSinglePlayer && (
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {playerScores.map((player, index) => (
                <div
                  key={index}
                  className="animate-scale-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <PlayerCard
                    name={player.name}
                    score={player.total}
                    isWinner={player.isWinner}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Score Breakdown */}
          <GameCard variant="neon" className="mb-8 animate-fade-in">
            <h2 className="font-orbitron font-bold text-xl text-foreground mb-6 text-center">
              Score Breakdown
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-orbitron text-sm text-muted-foreground uppercase">
                      {isSinglePlayer ? 'Round' : 'Player'}
                    </th>
                    {isSinglePlayer ? (
                      <>
                        <th className="text-center py-3 px-4 font-orbitron text-sm text-muted-foreground uppercase">
                          Score
                        </th>
                      </>
                    ) : (
                      [1, 2, 3].map((round) => (
                        <th key={round} className="text-center py-3 px-4 font-orbitron text-sm text-muted-foreground uppercase">
                          R{round}
                        </th>
                      ))
                    )}
                    <th className="text-right py-3 px-4 font-orbitron text-sm text-muted-foreground uppercase">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isSinglePlayer ? (
                    playerScores[0].rounds.map((round, index) => (
                      <tr 
                        key={index}
                        className="border-b border-border/50 animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <td className="py-4 px-4">
                          <span className="font-orbitron text-foreground">Round {round.round}</span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="font-arcade text-xl text-secondary">{round.score}</span>
                        </td>
                        <td className="py-4 px-4"></td>
                      </tr>
                    ))
                  ) : (
                    playerScores.map((player, index) => (
                      <tr 
                        key={index}
                        className="border-b border-border/50 animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <td className="py-4 px-4">
                          <span className="font-orbitron text-foreground">{player.name}</span>
                        </td>
                        {player.rounds.map((round, rIndex) => (
                          <td key={rIndex} className="py-4 px-4 text-center">
                            <span className="font-arcade text-lg text-secondary">{round.score}</span>
                          </td>
                        ))}
                        <td className="py-4 px-4 text-right">
                          <span className={`font-arcade text-2xl ${player.isWinner ? 'text-accent' : 'text-foreground'}`}>
                            {player.total}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                {isSinglePlayer && (
                  <tfoot>
                    <tr className="bg-muted/50">
                      <td className="py-4 px-4">
                        <span className="font-orbitron font-bold text-foreground">Final Score</span>
                      </td>
                      <td></td>
                      <td className="py-4 px-4 text-right">
                        <span className="font-arcade text-3xl text-primary">{playerScores[0].total}</span>
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </GameCard>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <GameButton
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={handleHome}
            >
              <Home className="w-5 h-5 mr-2" />
              Home
            </GameButton>
            <GameButton
              variant="primary"
              size="lg"
              className="flex-1"
              onClick={handlePlayAgain}
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Play Again
            </GameButton>
          </div>
        </div>
      </PageTransition>
    </GameLayout>
  );
};

export default GameResults;
