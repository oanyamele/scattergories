import React from "react";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Placeholder for game history, start game button, leaderboard</p>
      <button onClick={() => navigate("/game")}>Start Game</button>
    </div>
  );
}
