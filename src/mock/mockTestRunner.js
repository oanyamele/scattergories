import { setTestMode, EDGE_CASES, simulateMockRound } from "./mockRoundEngine.js";

setTestMode(EDGE_CASES.INVALID_WORDS);
//setTestMode(EDGE_CASES.DUPLICATES);
//setTestMode(EDGE_CASES.WRONG_LETTER);
//setTestMode(EDGE_CASES.MISSING_WORD);
//setTestMode(EDGE_CASES.HIGH_SCORING);



simulateMockRound().then((summary) => {
  console.log("=== Round Summary ===");
  console.log(JSON.stringify(summary, null, 2));
});
