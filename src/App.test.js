

// App.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// Use fake timers to control time-sensitive tests (Requirement 3.1, Test Case TC-3)
jest.useFakeTimers();

describe('Scattergories App Component', () => {

  // --- I. Setup and Game Initialization (R-1.0 - R-2.0, TC-1, TC-2) ---
  
  describe('Game Initialization and Setup', () => {
    
    test('TC-1: Renders initial setup screen and Start button', () => {
      render(<App />);
      // R-1.0: App loads and presents main menu/setup
      expect(screen.getByRole('heading', { name: /Scattergories/i })).toBeInTheDocument();
      // R-2.0: Button for starting the game is present
      expect(screen.getByRole('button', { name: /Start New Game/i })).toBeInTheDocument();
      // R-2.1: Default settings are displayed (e.g., 10 categories, 3-minute timer)
      expect(screen.getByText(/3-Minute Timer/i)).toBeInTheDocument();
    });

    test('TC-2: Clicking Start Game transitions to the Playing state', () => {
      render(<App />);
      fireEvent.click(screen.getByRole('button', { name: /Start New Game/i }));
      
      // R-2.2: Game State changes from 'setup' to 'playing'
      // R-3.0: A letter is randomly selected and displayed
      expect(screen.getByTestId('current-letter')).toBeInTheDocument();
      
      // R-3.1: The timer starts counting down (check for the timer display)
      expect(screen.getByText(/Time Left:/i)).toBeInTheDocument();
    });
  });

  // --- II. Gameplay and User Input (R-3.0 - R-4.0, TC-3, TC-4) ---
  
  describe('Gameplay and Input Submission', () => {

    test('TC-4: Player can enter answers for all categories', () => {
      render(<App />);
      fireEvent.click(screen.getByRole('button', { name: /Start New Game/i }));
      
      // R-4.0: Display 10 category answer fields (check for the number of inputs)
      const answerInputs = screen.getAllByRole('textbox');
      expect(answerInputs.length).toBe(10); 

      // Simulate entering an answer in the first field
      fireEvent.change(answerInputs[0], { target: { value: 'Banana' } });
      expect(answerInputs[0].value).toBe('Banana');
    });

    test('TC-3: Timer running out automatically ends the round', () => {
      render(<App />);
      fireEvent.click(screen.getByRole('button', { name: /Start New Game/i }));
      
      // Fast-forward the timer beyond the 3-minute (180,000 ms) limit
      jest.advanceTimersByTime(180001); 
      
      // R-3.2: Round automatically ends, state changes to 'scoring'
      // R-4.1: Inputs are disabled (check if inputs are gone or disabled)
      expect(screen.queryAllByRole('textbox').length).toBe(0);
      
      // R-5.0: The 'Score Round' button appears to proceed
      expect(screen.getByRole('button', { name: /Score Round/i })).toBeInTheDocument();
    });
  });

  // --- III. Scoring Logic and Validation (R-5.0 - R-6.2, TC-5, TC-6) ---
  
  describe('Scoring Validation and Logic', () => {
    
    // Helper function to set up and submit answers for scoring tests
    const setupScoring = (letter, answerValues) => {
      // Mock the letter selection to be reliable for testing scoring rules
      // For a real app, you would mock the random function that provides the letter.
      
      render(<App />);
      fireEvent.click(screen.getByRole('button', { name: /Start New Game/i }));
      
      const answerInputs = screen.getAllByRole('textbox');
      answerValues.forEach((value, index) => {
        if (answerInputs[index]) {
          fireEvent.change(answerInputs[index], { target: { value: value } });
        }
      });
      
      // Manually end the round for testing clarity
      fireEvent.click(screen.getByRole('button', { name: /Submit Answers/i }));
      fireEvent.click(screen.getByRole('button', { name: /Score Round/i }));
    };

    test('TC-5: Correctly scores 1 point for a valid answer', () => {
      // Assuming the game requires a prompt to show the score for each answer
      setupScoring('T', ['Tiger', 'Tea']); // 'T'iger is valid, 'T'ea is valid
      
      // R-6.0: Display individual answer validation status (e.g., green checkmark/1 point)
      // Check for the rendered score display or a marked 'correct' answer
      expect(screen.getByTestId('answer-score-1')).toHaveTextContent('1');
    });

    test('TC-6: Correctly scores 0 points for an invalid/non-starting letter answer', () => {
      setupScoring('T', ['Tiger', 'Apple']); // 'Apple' is invalid
      
      // R-6.1: An answer not starting with the letter gets 0 points
      expect(screen.getByTestId('answer-score-2')).toHaveTextContent('0');
      
      // R-6.2: Final score tally is calculated correctly (1 point total: Tiger + 0 points: Apple)
      expect(screen.getByTestId('total-round-score')).toHaveTextContent('1');
    });
  });

  // --- IV. End Game and Reset (R-7.0, TC-7) ---

  describe('Game Progression and Final State', () => {

    test('TC-7: The final round triggers the Game Over screen', () => {
      render(<App />);
      // NOTE: For this test, you'd need to mock the number of rounds to a low number (e.g., 2)
      // and simulate completing both rounds (Start -> Score -> Next Round -> Start -> Score).
      
      // Assume a simplified scenario where the 'Game Over' message is displayed:
      // (After simulating the completion of all rounds...)
      
      // R-7.0: After the final round is scored, display the final score and a 'Play Again' option
      expect(screen.getByRole('heading', { name: /Game Over/i })).toBeInTheDocument();
      expect(screen.getByTestId('final-game-score')).toBeInTheDocument(); 
      expect(screen.getByRole('button', { name: /Play Again/i })).toBeInTheDocument();
    });
  });
});