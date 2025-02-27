export const COLORS = ["red", "blue", "green", "yellow", "purple"];

export const getRandomColor = () =>
  COLORS[Math.floor(Math.random() * COLORS.length)];
