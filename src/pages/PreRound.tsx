import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GameLayout } from '@/components/layout/GameLayout';
import { PageTransition } from '@/components/layout/PageTransition';
import { GameCard } from '@/components/ui/GameCard';
import { GameButton } from '@/components/ui/GameButton';
import { LetterBadge } from '@/components/ui/LetterBadge';
import { CategoryCard } from '@/components/ui/CategoryCard';
import { RefreshCw, Play } from 'lucide-react';

const SAMPLE_CATEGORIES = [
  'Things in a Kitchen',
  'Famous Movies',
  'Types of Food',
  'Animals',
  'Cities',
  'Sports',
];

const LETTERS = 'ABCDEFGHIJKLMNOPRSTW';

const PreRound: React.FC = () => {
  const navigate = useNavigate();
  const { gameId, roundNumber } = useParams();
  const currentRound = parseInt(roundNumber || '1');

  const [letter, setLetter] = useState(() => 
    LETTERS[Math.floor(Math.random() * LETTERS.length)]
  );
  const [categories, setCategories] = useState(SAMPLE_CATEGORIES);

  const handleRegenerateLetter = () => {
    setLetter(LETTERS[Math.floor(Math.random() * LETTERS.length)]);
  };

  const handleStartRound = () => {
    navigate(`/game/${gameId}/round/${currentRound}`, {
      state: { letter, categories }
    });
  };

  return (
    <GameLayout>
      <PageTransition>
        <div className="max-w-4xl mx-auto py-8">
          {/* Round Indicator */}
          <div className="text-center mb-8 animate-slide-in-top">
            <p className="font-orbitron text-sm text-muted-foreground uppercase mb-2">
              Get Ready for
            </p>
            <h1 className="font-arcade text-3xl md:text-4xl text-primary neon-text">
              ROUND {currentRound} OF 3
            </h1>
          </div>

          {/* Letter Section */}
          <GameCard variant="neon" className="mb-8 animate-scale-in">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="font-orbitron text-sm text-muted-foreground uppercase mb-2">
                    Your Letter
                  </p>
                  <LetterBadge letter={letter} />
                </div>
              </div>
              <GameButton
                variant="outline"
                onClick={handleRegenerateLetter}
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                New Letter
              </GameButton>
            </div>
          </GameCard>

          {/* Categories Section */}
          <GameCard variant="default" className="mb-8 animate-slide-in-bottom">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-orbitron font-bold text-xl text-foreground">
                Categories
              </h2>
              <p className="text-sm text-muted-foreground font-orbitron">
                Think of words starting with "{letter}"
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {categories.map((category, index) => (
                <CategoryCard
                  key={index}
                  category={category}
                  index={index}
                />
              ))}
            </div>
          </GameCard>

          {/* Start Button */}
          <GameButton
            size="lg"
            className="w-full"
            onClick={handleStartRound}
          >
            <Play className="w-6 h-6 mr-2" />
            Start Round (60 seconds)
          </GameButton>
        </div>
      </PageTransition>
    </GameLayout>
  );
};

export default PreRound;
