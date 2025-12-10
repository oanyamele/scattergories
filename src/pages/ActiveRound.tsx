import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { GameLayout } from '@/components/layout/GameLayout';
import { PageTransition } from '@/components/layout/PageTransition';
import { GameCard } from '@/components/ui/GameCard';
import { GameButton } from '@/components/ui/GameButton';
import { Timer } from '@/components/ui/Timer';
import { LetterBadge } from '@/components/ui/LetterBadge';
import { CategoryCard } from '@/components/ui/CategoryCard';
import { Send } from 'lucide-react';

const DEFAULT_CATEGORIES = [
  'Things in a Kitchen',
  'Famous Movies',
  'Types of Food',
  'Animals',
  'Cities',
  'Sports',
];

const ActiveRound: React.FC = () => {
  const navigate = useNavigate();
  const { gameId, roundNumber } = useParams();
  const location = useLocation();
  const currentRound = parseInt(roundNumber || '1');

  // Get letter and categories from navigation state or use defaults
  const { letter = 'A', categories = DEFAULT_CATEGORIES } = (location.state as any) || {};

  const [answers, setAnswers] = useState<string[]>(Array(6).fill(''));
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Navigate to results with answers
    navigate(`/game/${gameId}/results/${currentRound}`, {
      state: { letter, categories, answers, isSinglePlayer: gameId === 'new' }
    });
  };

  const handleTimeUp = () => {
    if (!isSubmitted) {
      handleSubmit();
    }
  };

  return (
    <GameLayout>
      <PageTransition>
        <div className="max-w-4xl mx-auto py-4 md:py-8">
          {/* Header with Timer and Letter */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-6 animate-slide-in-top">
              <LetterBadge letter={letter} size="md" animated={false} />
              <div>
                <p className="font-orbitron text-sm text-muted-foreground uppercase">
                  Round {currentRound} of 3
                </p>
                <p className="font-orbitron text-lg text-foreground">
                  Words starting with "{letter}"
                </p>
              </div>
            </div>
            
            <div className="animate-scale-in">
              <Timer 
                seconds={60} 
                onComplete={handleTimeUp}
                isRunning={!isSubmitted}
                size="md"
              />
            </div>
          </div>

          {/* Answer Grid */}
          <GameCard variant="default" className="mb-8">
            <div className="grid md:grid-cols-2 gap-4">
              {categories.map((category: string, index: number) => (
                <CategoryCard
                  key={index}
                  category={category}
                  index={index}
                  answer={answers[index]}
                  onAnswerChange={(value) => handleAnswerChange(index, value)}
                  showInput={true}
                  disabled={isSubmitted}
                />
              ))}
            </div>
          </GameCard>

          {/* Submit Button */}
          <GameButton
            size="lg"
            className="w-full"
            onClick={handleSubmit}
            disabled={isSubmitted}
            glow
          >
            <Send className="w-5 h-5 mr-2" />
            Submit Answers
          </GameButton>
        </div>
      </PageTransition>
    </GameLayout>
  );
};

export default ActiveRound;
