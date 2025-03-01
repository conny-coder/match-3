import { createContext } from "react";
import { getStoreLocal } from "../utils/local-storage";

interface IGameContext {
  score: number;
  maxScore: number;
  setScore: (score: number) => void;
}

const defaultValue: IGameContext = {
  maxScore: Number(getStoreLocal("score")) || 0,
  setScore: () => {},
  score: 0,
};

const GameContext = createContext<IGameContext>(defaultValue);

export default GameContext;
