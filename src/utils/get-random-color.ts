export const COLORS = ["red", "blue", "green", "yellow", "purple"];

export const getRandomTile = () => ({
  color: COLORS[Math.floor(Math.random() * COLORS.length)],
  id: Math.random(),
});
