import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { GameLayout } from '@/components/layout/GameLayout';
import { PageTransition } from '@/components/layout/PageTransition';
import { GameCard } from '@/components/ui/GameCard';
import { GameButton } from '@/components/ui/GameButton';
import { Confetti } from '@/components/ui/Confetti';
import { ArrowRight, Check, X } from 'lucide-react';

interface RoundResult {
  category: string;
  answer: string;
  points: number;
  isValid: boolean;
}

const RoundResults: React.FC = () => {
  const navigate = useNavigate();
  const { gameId, roundNumber } = useParams();
  const location = useLocation();
  const currentRound = parseInt(roundNumber || '1');

  const { letter = 'A', categories = [], answers = [], players = true } = 
    (location.state as any) || {};

  const [showConfetti, setShowConfetti] = useState(false);

 
  const playersData = [
    { name: 'Player 1 (You)', answers },
    {
      name: 'Player 2',
      answers: categories.map(() => {
        const sampleWords = ['Apple', 'Ant', 'Astronaut', 'Avocado', 'Arrow', 'Anchor'];
        const word = sampleWords.find(w => w.toUpperCase().startsWith(letter)) || sampleWords[0];
        return word; 
      }),
    },
  ];

  
  const resultsByPlayer = playersData.map(player => {
    return categories.map((category, index) => {
      const answer = player.answers[index] || '';
      const isValid = answer.length > 0 && answer.toUpperCase().startsWith(letter);
      const points = isValid ? Math.floor(Math.random() * 3) + 1 : 0;
      return { category, answer, points, isValid };
    });
  });

  const totalPointsByPlayer = resultsByPlayer.map(playerResults =>
    playerResults.reduce((sum, r) => sum + r.points, 0)
  );

  useEffect(() => {
    if (totalPointsByPlayer[0] >= 10) {
      setShowConfetti(true);
    }
  }, [totalPointsByPlayer[0]]);

  const handleNextRound = () => {
    if (currentRound >= 3) {
      navigate(`/game/${gameId}/final`, {
        state: { playersData },
      });
    } else {
      navigate(`/game/${gameId}/pre-round/${currentRound + 1}`);
    }
  };

  return (
    <GameLayout>
      <PageTransition>
        <Confetti isActive={showConfetti} />

        <div className="max-w-4xl mx-auto py-8">
          {/* Header */}
          <div className="text-center mb-8 animate-slide-in-top">
            <p className="font-orbitron text-sm text-muted-foreground uppercase mb-2">
              Round {currentRound} Complete!
            </p>

            <h1 className="font-arcade text-3xl md:text-4xl text-primary neon-text mb-4">
              RESULTS
            </h1>

            {/* Added missing </div> */}
            <div className="inline-flex items-center gap-2 bg-card border-2 border-primary rounded-xl px-6 py-3">
              <span className="font-orbitron text-muted-foreground">Round Score:</span>
              <span className="font-arcade text-3xl text-primary">{totalPointsByPlayer[0]}</span>
              <span className="font-orbitron text-muted-foreground">pts</span>
            </div>
          </div>

          {/* Results Table – now loops all players */}
          {playersData.map((player, idx) => (
            <GameCard key={idx} variant="default" className="mb-8 animate-scale-in">
              <h2 className="font-orbitron text-lg font-bold mb-4">{player.name}</h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-orbitron text-sm text-muted-foreground uppercase">
                        Category
                      </th>
                      <th className="text-left py-3 px-4 font-orbitron text-sm text-muted-foreground uppercase">
                        Your Answer
                      </th>
                      <th className="text-center py-3 px-4 font-orbitron text-sm text-muted-foreground uppercase">
                        Valid
                      </th>
                      <th className="text-right py-3 px-4 font-orbitron text-sm text-muted-foreground uppercase">
                        Points
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {resultsByPlayer[idx].map((result, i) => (
                      <tr
                        key={i}
                        className="border-b border-border/50 animate-fade-in"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        <td className="py-4 px-4">
                          <span className="font-orbitron text-foreground">{result.category}</span>
                        </td>

                        <td className="py-4 px-4">
                          <span
                            className={`font-orbitron ${
                              result.answer ? 'text-foreground' : 'text-muted-foreground italic'
                            }`}
                          >
                            {result.answer || 'No answer'}
                          </span>
                        </td>

                        <td className="py-4 px-4 text-center">
                          {result.isValid ? (
                            <Check className="w-5 h-5 text-neon-green mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-destructive mx-auto" />
                          )}
                        </td>

                        <td className="py-4 px-4 text-right">
                          <span
                            className={`font-arcade text-xl ${
                              result.points > 0 ? 'text-neon-green' : 'text-muted-foreground'
                            }`}
                          >
                            +{result.points}
                          </span>
                        </td>
                      </tr>
                    ))} 
                    {/* ---------------------------------------------------------
                        FIXED: REMOVED STRAY '{' THAT WAS BREAKING JSX
                       --------------------------------------------------------- */}
                  </tbody>

                  <tfoot>
                    <tr className="bg-muted/50">
                      <td colSpan={3} className="py-4 px-4 text-right font-bold">
                        Total
                      </td>
                      <td className="py-4 px-4 text-right">{totalPointsByPlayer[idx]}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </GameCard>
          ))}

          {/* Next Round Button */}
          <GameButton size="lg" className="w-full" onClick={handleNextRound}>
            {currentRound >= 3
              ? 'See Final Results'
              : `Next Round (${currentRound + 1}/3)`}
            <ArrowRight className="w-5 h-5 ml-2" />
          </GameButton>
        </div>
      </PageTransition>
    </GameLayout>
  );
};

export default RoundResults;

