import React, { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  left: number;
  delay: number;
  color: string;
  size: number;
}

const COLORS = [
  'hsl(320, 100%, 60%)', // pink
  'hsl(180, 100%, 50%)', // cyan
  'hsl(45, 100%, 50%)',  // yellow
  'hsl(150, 100%, 45%)', // green
  'hsl(25, 100%, 55%)',  // orange
  'hsl(280, 100%, 65%)', // purple
];

const Confetti: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (isActive) {
      const newPieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 10 + 5,
      }));
      setPieces(newPieces);

      const timeout = setTimeout(() => {
        setPieces([]);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [isActive]);

  if (!isActive || pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti"
          style={{
            left: `${piece.left}%`,
            top: '-20px',
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
          }}
        />
      ))}
    </div>
  );
};

export { Confetti };
