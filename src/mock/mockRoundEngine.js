/* mockRoundEngine.js — CLEAN + FIXED + WORKING EDGE CASES */

// ----------------------------------------------
// DATA POOLS
// ----------------------------------------------
const CATEGORY_POOL = [
  "Animals", "Countries", "Foods", "Movies",
  "Cities", "Objects", "Sports", "Plants"
];

const WORD_POOL = {
  Animals: ["Cat", "Dog", "Lion", "Rabbit", "Raccoon", "Snake", "Tiger"],
  Countries: ["Romania", "Russia", "Rwanda", "Canada", "Italy", "Japan"],
  Foods: ["Rice", "Ravioli", "Ramen", "Carrot", "Apple", "Banana"],
  Movies: ["Ratatouille", "Rocky", "Rush", "Avatar", "Inception"],
  Cities: ["Rome", "Riga", "Raleigh", "Paris", "London"],
  Objects: ["Radio", "Rope", "Ruler", "Book", "Pen"],
  Sports: ["Rugby", "Rowing", "Racquetball", "Soccer"],
  Plants: ["Rose", "Rhododendron", "Rice", "Tulip"],
};

// ----------------------------------------------
// UTILITY
// ----------------------------------------------
const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];
const generateLetter = () => "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random()*26)];
const generateCategories = (n=3) => CATEGORY_POOL.sort(() => 0.5 - Math.random()).slice(0,n);

// ----------------------------------------------
// EDGE CASE MODES (REAL VERSION)
// ----------------------------------------------
export const EDGE_CASES = {
  NORMAL: "NORMAL",
  INVALID_WORDS: "INVALID_WORDS",
  DUPLICATES: "DUPLICATES",
  WRONG_LETTER: "WRONG_LETTER",
  MISSING_WORD: "MISSING_WORD",
  HIGH_SCORING: "HIGH_SCORING",
};

export let CURRENT_TEST_MODE = EDGE_CASES.NORMAL;

export function setTestMode(mode) {
  CURRENT_TEST_MODE = mode;
}

// ----------------------------------------------
// WORD GENERATION
// ----------------------------------------------
function generateWordForCategory(category, letter) {
  const words = WORD_POOL[category] || [];
  const matching = words.filter(w => w.startsWith(letter));

  switch (CURRENT_TEST_MODE) {
    case EDGE_CASES.INVALID_WORDS:
      return "%%%INVALID%%%_" + Math.floor(Math.random()*100);

    case EDGE_CASES.WRONG_LETTER:
      return "Z" + "WrongStart_" + Math.floor(Math.random()*100);

    case EDGE_CASES.MISSING_WORD:
      return "";

    case EDGE_CASES.HIGH_SCORING:
      return letter + "SuperLongWordForBonusPoints";

    default: // NORMAL
      if (matching.length > 0) return randomItem(matching);
      return letter + "word" + Math.floor(Math.random()*100);
  }
}

// ----------------------------------------------
// SCORING
// ----------------------------------------------
export function scoreWord(word, letter) {
  if (!word || typeof word !== "string") return 0;

  if (word.includes("%%%INVALID%%%")) return 0;

  const startsCorrect = word[0]?.toUpperCase() === letter;

  if (CURRENT_TEST_MODE === EDGE_CASES.HIGH_SCORING) {
    return word.length * 2;
  }

  if (!startsCorrect) return 0;

  let score = word.length;
  if (word.length >= 6) score += 2;

  return score;
}

// ----------------------------------------------
// ROUND SIMULATOR (FIXED VERSION)
// ----------------------------------------------
export async function simulateMockRound() {
  const letter = generateLetter();
  const categories = generateCategories(3);

  console.log("=== Simulating Mock Round ===");
  console.log("Letter:", letter);
  console.log("Categories:", categories);
  console.log("Mode:", CURRENT_TEST_MODE);
  console.log("--------------------------------");

  // Generate words
  let words = categories.map(cat => generateWordForCategory(cat, letter));

  // Duplicate edge case → force all words identical
  if (CURRENT_TEST_MODE === EDGE_CASES.DUPLICATES) {
    words = words.map(_ => words[0]);
  }

  // Score
  const results = words.map((word, i) => ({
    category: categories[i],
    word,
    startsCorrectLetter: word[0]?.toUpperCase() === letter,
    points: scoreWord(word, letter),
  }));

  const totalScore = results.reduce((s, r) => s + r.points, 0);

  return {
    letter,
    categories,
    results,
    totalScore,
  };
}
