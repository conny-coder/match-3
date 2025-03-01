import { ITile } from "../components/GameBoard";

export const COLORS = ["red", "blue", "green", "yellow", "purple"];

export const getRandomTile = (): ITile => ({
  color: COLORS[Math.floor(Math.random() * COLORS.length)],
  id: Math.random(),
  initialX: 0,
  initialY: -50,
  x: 0,
  y: 0,
});
