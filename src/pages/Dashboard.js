import React from "react";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Placeholder for game history, start game button, leaderboard</p>
      <button onClick={() => navigate("/game")}>Start Game</button>
    </div>
  );
}
