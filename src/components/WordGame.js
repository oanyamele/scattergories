/**
 * WordGame.js - Core logic for word validation, scoring, and game state.
 */
class WordGame {
    constructor(startingLetter, categories, wordDictionary) {
        this.startingLetter = startingLetter.toUpperCase();
        this.categories = categories;
        this.dictionary = new Set(wordDictionary);
        this.submissions = {}; // { category: { word: string, isValid: boolean, isUnique: boolean, score: number } }
        this.submittedWords = new Set(); // Tracks all words submitted by THIS player for DUP-001/SCORE-002
        this.score = 0;
    }

    // --- RND-001 & TMR-001 related functions (Simplified) ---

    static getRandomLetter() {
        const alphabet = 'ABCDEFGHIJKLMNOPRSTUVW'; // Excluding Q, X, Y, Z for simplicity
        return alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    startGame() {
        console.log(`Starting round with letter: ${this.startingLetter}`);
        // In a real app, this would start the TMR-001 timer and UI updates
        // For testing, we just set the initial state.
        this.timer = 60; 
        return { letter: this.startingLetter, categories: this.categories };
    }

    // --- VAL-001, VAL-002, VAL-003, SCORE-001, SCORE-002 related functions ---

    /**
     * VAL-001, VAL-002, VAL-003, SCORE-001, SCORE-002
     * Simulates submitting a word and calculating the score.
     * @param {string} category The category the word belongs to.
     * @param {string} word The submitted word.
     * @param {Set<string>} allOpponentWords A set of all words submitted by opponents (for DUP-001).
     * @returns {object} Validation result and score breakdown.
     */
    submitWord(category, word, allOpponentWords = new Set()) {
        const normalizedWord = word.trim().toUpperCase();
        let isValid = true;
        let reason = 'Valid';
        let baseScore = 0;
        let uniquenessMultiplier = 1;
        let score = 0;

        // VAL-003: Check starting letter
        if (normalizedWord[0] !== this.startingLetter) {
            isValid = false;
            reason = 'Wrong starting letter';
        } 
        
        // VAL-002: Check dictionary
        else if (!this.dictionary.has(normalizedWord)) {
            isValid = false;
            reason = 'Invalid/Misspelled word (not in dictionary)';
        }

        // VAL-001: Success path
        if (isValid) {
            // SCORE-001: Score based on length
            baseScore = normalizedWord.length * 5; // Simple scoring
            
            // SCORE-002: Check uniqueness (by this player)
            if (this.submittedWords.has(normalizedWord)) {
                uniquenessMultiplier = 0.5; // Penalty for re-submitting the same word
                reason = 'Duplicate submission by this player';
            }
            
            // DUP-001: Check uniqueness against opponents' words
            else if (allOpponentWords.has(normalizedWord)) {
                uniquenessMultiplier = 0.5; // Penalty for duplicate across players (e.g., half points)
                reason = 'Common word (submitted by an opponent)';
            }

            score = baseScore * uniquenessMultiplier;
            this.score += score;
            this.submittedWords.add(normalizedWord);
        }

        const result = {
            word: normalizedWord,
            category: category,
            isValid: isValid,
            reason: reason,
            baseScore: baseScore,
            uniquenessMultiplier: uniquenessMultiplier,
            finalScore: score
        };

        // UIX-001: Store and give immediate feedback
        this.submissions[category] = result; 
        return result;
    }
}

// Simple American English dictionary for I18N-001
const dictionary = ['CAT', 'DOG', 'APPLE', 'HOUSE', 'COLOR', 'ZEBRA', 'ROME', 'MANGO']; 

module.exports = { WordGame, dictionary };