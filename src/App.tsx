import GameBoard from "./components/GameBoard";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Match-3 Game</h1>
      <GameBoard />
    </div>
  );
}

export default App;
