import { ITile } from "../components/GameBoard";
import { BOARD_SIZE } from "./create-board";

export const checkMatches = (board: ITile[][]) => {
  let matches: [number, number][] = [];

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col <= BOARD_SIZE - 3; col++) {
      if (
        board[row][col].color === board[row][col + 1].color &&
        board[row][col].color === board[row][col + 2].color &&
        board[row][col].color !== null
      ) {
        matches.push([row, col], [row, col + 1], [row, col + 2]);
      }
    }
  }

  for (let col = 0; col < BOARD_SIZE; col++) {
    for (let row = 0; row <= BOARD_SIZE - 3; row++) {
      if (
        board[row][col].color === board[row + 1][col].color &&
        board[row][col].color === board[row + 2][col].color &&
        board[row][col].color !== null
      ) {
        matches.push([row, col], [row + 1, col], [row + 2, col]);
      }
    }
  }

  return matches;
};
