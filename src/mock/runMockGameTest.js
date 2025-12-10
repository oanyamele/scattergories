// ========================================================
//  RUN MOCK ENGINE TESTS (edge-case testing)
//  ONLY RUNS WHEN ENABLED
// ========================================================

import { simulateMockRound, setTestMode, EDGE_CASES } from "./mockRoundEngine.js";
import { gameApi } from "../api/apiSelector.js";

// Toggle which test system to run
const RUN_ENGINE_TESTS = false;   // <-- set YES/NO
const RUN_GAME_TESTS   = false;    // <-- set YES/NO


// ========================================================
//  1. ENGINE-ONLY TESTS (Edge-case word generation)
// ========================================================
async function runAllEngineTests() {
  console.log("=== Running Mock Round Engine Tests ===");

  const modes = Object.values(EDGE_CASES).filter(mode => mode !== EDGE_CASES.NORMAL);


  for (const mode of modes) {
    console.log("\n==============================");
    console.log(" RUNNING MODE:", mode);
    console.log("==============================");

    setTestMode(mode);
    const result = await simulateMockRound();

    console.log(JSON.stringify(result, null, 2));
  }
}



// ========================================================
//  2. FULL GAME TEST (Game API + round engine)
// ========================================================
export async function runMockGameTest() {
  console.log("\n=== Starting Mock Game Test ===\n");

  // 1. Create game
  console.log("Creating game...");
  const game = await gameApi.createGame("test-user");
  console.log("Game created:", game, "\n");

  // 2. Start game
  console.log("Starting game...");
  await gameApi.startGame(game.id);
  console.log("Game started.\n");

  const roundsToSimulate = 3;
  let gameTotalScore = 0;

  for (let r = 0; r < roundsToSimulate; r++) {
    console.log(`\n=== ROUND ${r + 1} ===`);

    // 3. Create simulated round
    const mock = await simulateMockRound();

    console.log("Letter:", mock.letter);
    console.log("Categories:", mock.categories);
    console.log("Generated words:", mock.results.map(r => r.word), "\n");

    // 4. Start round in API
    const round = await gameApi.startNextRound(game.id);

    // 5. Submit words
    for (let i = 0; i < mock.results.length; i++) {
      const result = mock.results[i];

      await gameApi.submitWord(round.id, {
        category: result.category,
        word: result.word,
        points: result.points,
        isValid: result.startsCorrectLetter  // replaced undefined field
      });
    }

    // 6. Fetch submissions
    const submitted = await gameApi.getSubmissions(round.id);
    console.log("Submissions:", submitted);

    // 7. Score round
    const roundScore = submitted.reduce((s, x) => s + x.points, 0);
    console.log(`Round score: ${roundScore}`);

    gameTotalScore += roundScore;
  }

  console.log("\n=== Mock Game Test Complete ===");
  console.log(`Final game score after ${roundsToSimulate} rounds: ${gameTotalScore}\n`);
}



// ========================================================
//  WHICH TESTS TO RUN
// ========================================================

if (RUN_GAME_TESTS) {
  runMockGameTest().catch(err => console.error("Game test error:", err));
}

