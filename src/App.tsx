import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Lobby from "./pages/Lobby";
import PreRound from "./pages/PreRound";
import ActiveRound from "./pages/ActiveRound";
import RoundResults from "./pages/RoundResults";
import GameResults from "./pages/GameResults";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/lobby/:gameId" element={<Lobby />} />
          <Route path="/game/:gameId/pre-round/:roundNumber" element={<PreRound />} />
          <Route path="/game/:gameId/round/:roundNumber" element={<ActiveRound />} />
          <Route path="/game/:gameId/results/:roundNumber" element={<RoundResults />} />
          <Route path="/game/:gameId/final" element={<GameResults />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
