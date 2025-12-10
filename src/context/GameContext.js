import React, { createContext, useState } from "react";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [currentCategory, setCurrentCategory] = useState("Loading...");
  const [currentLetter, setCurrentLetter] = useState("A");
  const [submissions, setSubmissions] = useState([]);

  return (
    <GameContext.Provider value={{ currentCategory, currentLetter, submissions }}>
      {children}
    </GameContext.Provider>
  );
};
