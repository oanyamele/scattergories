import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { GameButton } from '../ui/GameButton';

const GameHeader: React.FC = () => {
  const navigate = useNavigate();
  // TODO: Replace with actual auth state
  const isAuthenticated = false;

  const handleLogout = () => {
    // TODO: Implement logout
    navigate('/auth');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <h1 className="font-arcade text-xl md:text-2xl text-primary neon-text">
            SCATTERGORIES
          </h1>
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link 
                to="/profile" 
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="font-orbitron text-sm hidden md:inline">Profile</span>
              </Link>
              <GameButton 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </GameButton>
            </>
          ) : (
            <GameButton 
              variant="primary" 
              size="sm" 
              onClick={() => navigate('/auth')}
            >
              Sign In
            </GameButton>
          )}
        </div>
      </div>
    </header>
  );
};

export { GameHeader };
