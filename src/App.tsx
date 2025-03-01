import GameBoard from "./components/GameBoard";
import "./App.css";
import GameContext from "./providers/GameContext";
import { useState } from "react";
import { getStoreLocal } from "./utils/local-storage";

const MAXSCORE = Number(getStoreLocal("score"));

function App() {
  const [score, setScore] = useState(0);

  const updateScore = (newScore: number) => {
    setScore((prevScore) => {
      const updatedScore = prevScore + newScore;

      if (updatedScore > MAXSCORE) {
        localStorage.setItem("score", JSON.stringify(updatedScore));
      }

      return updatedScore;
    });
  };

  return (
    <GameContext.Provider
      value={{ score: score, setScore: updateScore, maxScore: MAXSCORE }}
    >
      <div className="App">
        <h1 style={{ textAlign: "center" }}>Match-3 Game</h1>
        <GameBoard />
        <div style={{ textAlign: "center", fontSize: "1.5rem" }}>
          <p>Score: {score}</p>
          <p>MaxScore: {MAXSCORE}</p>
        </div>
      </div>
    </GameContext.Provider>
  );
}

export default App;
