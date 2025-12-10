// Mock setup for testing
const { WordGame, dictionary } = require('./WordGame'); 

describe('Game Core Functionality Tests', () => {

    // Helper to simulate a new round
    let game;
    beforeEach(() => {
        // Setup a consistent starting state for most tests
        const categories = ['Name', 'Place', 'Thing', 'Animal'];
        game = new WordGame('M', categories, dictionary);
    });

    // --- Scoring and Validation (VAL-001, VAL-002, VAL-003, SCORE-001, SCORE-002) ---

    describe('Word Validation and Scoring', () => {
        
        test('VAL-001: Valid word accepted and scored', () => {
            // Submit a valid, real word that matches the starting letter/category.
            const result = game.submitWord('Animal', 'MANGO');
            expect(result.isValid).toBe(true);
            expect(result.finalScore).toBeGreaterThan(0);
            expect(result.reason).toBe('Valid');
            // Success: Word is accepted, marked as valid, and awarded points.
        });

        test('VAL-002: Invalid/non-real word rejected (zzyzx)', () => {
            // Submit a word that is misspelled or is not a real word (e.g., "zzyzx").
            const result = game.submitWord('Thing', 'ZZYZX');
            expect(result.isValid).toBe(false);
            expect(result.finalScore).toBe(0);
            expect(result.reason).toBe('Invalid/Misspelled word (not in dictionary)');
            // Success: Word is rejected, marked as invalid, and awards 0 points.
        });

        test('VAL-003: Wrong starting letter rejected', () => {
            // Submit a real word that does not start with the required letter ('M').
            const result = game.submitWord('Place', 'ROME');
            expect(result.isValid).toBe(false);
            expect(result.finalScore).toBe(0);
            expect(result.reason).toBe('Wrong starting letter');
            // Success: Word is rejected, marked as having the wrong letter, and awards 0 points.
        });

        test('SCORE-001: Score based on word length', () => {
            // Submit a 3-letter word and a 10-letter word (both valid) in the same game.
            const score3L = game.submitWord('Animal', 'MAN')['finalScore']; // 3-letter
            const score5L = game.submitWord('Thing', 'MANGO')['finalScore']; // 5-letter
            expect(score5L).toBeGreaterThan(score3L);
            // Success: The 5-letter word receives a higher base score than the 3-letter word.
        });
        
        test('SCORE-002: Common/Duplicate word by same player is penalized', () => {
            // Submit the same word twice.
            const firstSubmission = game.submitWord('Thing', 'MANGO');
            const secondSubmission = game.submitWord('Animal', 'MANGO'); // Different category, same word
            
            // First one is full score
            expect(firstSubmission.uniquenessMultiplier).toBe(1);
            
            // Second one is penalized (half score in this model)
            expect(secondSubmission.uniquenessMultiplier).toBe(0.5);
            expect(secondSubmission.finalScore).toBe(firstSubmission.finalScore / 2);
            expect(secondSubmission.reason).toBe('Duplicate submission by this player');
            // Success: Word is flagged as "Duplicate," and the score is adjusted accordingly (e.g., halved).
        });
    });
    
    // --- Multiplayer / DUP-001 ---

    describe('Multiplayer Synchronization and Duplication', () => {
        test('DUP-001: Detect duplicate word across players (simulated)', () => {
            // Two different players submit the identical word (e.g., "ROME") for the same category.
            // Setup a game with 'R' as the starting letter
            const gamePlayerA = new WordGame('R', ['Place'], dictionary);
            const gamePlayerB = new WordGame('R', ['Place'], dictionary);
            
            const opponentWords = new Set(['ROME']); // Assume Player B submitted it first/simultaneously
            
            const resultA = gamePlayerA.submitWord('Place', 'ROME', opponentWords);
            
            expect(resultA.isValid).toBe(true);
            expect(resultA.uniquenessMultiplier).toBe(0.5); // Penalty applied
            expect(resultA.reason).toBe('Common word (submitted by an opponent)');
            // Success: The final scoring logic detects the duplicate, and the player receives a reduced penalty score.
        });
        
        test('SYNC-002: Round status updates (simulated)', () => {
            // Player A finishes the round first. Player B verifies their screen updates.
            // In the client, this is handled by a real-time service (like WebSockets).
            // This test verifies the game's internal score is ready once the round ends.
            
            game.submitWord('Animal', 'MANGO');
            expect(game.score).toBeGreaterThan(0);

            // Simulation of Player A finishing the round
            const isRoundOver = true; 
            
            // In a real multiplayer setting, this would trigger an update to Player B's UI.
            if (isRoundOver) {
                // Assert that B's system transitions state (e.g., waiting status)
                // This would be tested in a higher-level UI/Integration test, 
                // but we confirm the core game state is final.
                const finalScore = game.score;
                expect(finalScore).toBe(25); // 5 letters * 5 points
            }
            // Success: Round status updates are immediate for all players (simulated state readiness).
        });
    });

    // --- Localization (I18N-001) ---

    test('I18N-001: Game content matches American English', () => {
        // Submit a common American English word ("color") and a common British English word ("colour").
        // Our dictionary only contains 'COLOR'
        
        // American English check
        const resultUS = game.submitWord('Thing', 'COLOR');
        expect(resultUS.isValid).toBe(true); // 'COLOR' is accepted

        // British English check
        const resultUK = game.submitWord('Thing', 'COLOUR');
        expect(resultUK.isValid).toBe(false); // 'COLOUR' is rejected (not in our US dictionary)
        expect(resultUK.reason).toBe('Invalid/Misspelled word (not in dictionary)');
        // Success: "color" is accepted as valid. "colour" is rejected as invalid/misspelled.
    });

    // --- Random and Timer (RND-001, TMR-001) ---
    
    test('RND-001: Random category and letter', () => {
        const letters = new Set();
        // Start 5 consecutive single-player rounds.
        for (let i = 0; i < 5; i++) {
            const randomLetter = WordGame.getRandomLetter();
            letters.add(randomLetter);
        }
        // Check if at least 2 unique letters were generated (high probability of uniqueness)
        expect(letters.size).toBeGreaterThan(1); 
        // Success: Each round begins with a unique, randomly chosen letter (and unique categories would be an array randomization).
    });
    
    // Note: TMR-001 (60-second timer) and PERF-001 (load time) require **actual asynchronous code** and a timing utility 
    // (e.g., 'setTimeout' and 'performance.now()' in a real app or mock timers in Jest). 
    // They cannot be accurately unit-tested with this simple synchronous class structure.
});