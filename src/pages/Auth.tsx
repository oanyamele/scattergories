import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameLayout } from '@/components/layout/GameLayout';
import { PageTransition } from '@/components/layout/PageTransition';
import { GameCard } from '@/components/ui/GameCard';
import { GameButton } from '@/components/ui/GameButton';
import { GameInput } from '@/components/ui/GameInput';
import { Mail, Lock, User, Chrome } from 'lucide-react';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // const googleLogin = useGoogleLogin({
  //   onSuccess: (tokenResponse) => {
  //     console.log('Google token:', tokenResponse.access_token);
  //     // TODO: send token to backend for authentication
  //     navigate(`/lobby/testgame1?host=true`);
  //   },
  //   onError: () => {
  //     console.log('Google login failed');
  //   },
  // })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Implement actual auth
    setTimeout(() => {
      setIsLoading(false);
      navigate('/lobby/testgame1?host=true');
    }, 1000);
  };

  const handleGoogleAuth = () => {
    // TODO: Implement Google auth
    console.log('Google auth');
  };

  return (
    <GameLayout showHeader={false}>
      <PageTransition>
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          {/* Logo */}
          <div className="text-center mb-8 animate-slide-in-top">
            <h1 className="font-arcade text-4xl md:text-5xl text-primary neon-text mb-2">
              SCATTERGORIES
            </h1>
            <p className="font-orbitron text-muted-foreground">
              The Ultimate Word Game
            </p>
          </div>

          <GameCard variant="neon" className="w-full max-w-md animate-scale-in">
            {/* Tab Toggle */}
            <div className="flex mb-6 bg-muted rounded-xl p-1">
              <button
                onClick={() => setIsSignUp(false)}
                className={`flex-1 py-2 rounded-lg font-orbitron text-sm transition-all duration-200 ${
                  !isSignUp 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                className={`flex-1 py-2 rounded-lg font-orbitron text-sm transition-all duration-200 ${
                  isSignUp 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <GameInput
                    type="text"
                    placeholder="Username"
                    // className="pl-11" // Added padding-left to prevent overlap
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    leftIcon={<User />}
                    className="pl-12 h-12 bg-muted text-foreground border-none"
                  />
                </div>
              )}
              
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <GameInput
                  type="email"
                  placeholder="Email"
                  // className="pl-11 h-12" // Added padding-left to prevent overlap
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  leftIcon={<Mail />}
                  className="pl-12 h-12 bg-muted text-foreground border-none"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <GameInput
                  type="password"
                  placeholder="Password"
                  // className="pl-11 h-12" // Added padding-left to prevent overlap
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  leftIcon={<Lock />}
                  className="pl-12 h-12 bg-muted text-foreground border-none"
                />
              </div>

              <GameButton 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isLoading}
                // Removed glow to prevent flashing
              >
                {isLoading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
              </GameButton>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground font-orbitron">
                  Or continue with
                </span>
              </div>
            </div>

            <GameButton 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2" 
              onClick={handleGoogleAuth}
            >
              <Chrome className="w-5 h-5" />
              Google
            </GameButton>

            {!isSignUp && (
              <p className="text-center text-sm text-muted-foreground mt-4 font-orbitron">
                <button 
                  className="text-primary hover:underline"
                  disabled // 'Forgot password' button has been disabled
                  >
                  Forgot password?
                </button>
              </p>
            )}
          </GameCard>
        </div>
      </PageTransition>
    </GameLayout>
  );
};

export default Auth;
