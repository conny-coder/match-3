import { checkMatches } from "./check-matches";
import { getRandomColor } from "./get-random-color";

export const BOARD_SIZE = 8;

export const createBoard = () => {
  let board: string[][];
  do {
    board = Array.from({ length: BOARD_SIZE }, () =>
      Array.from({ length: BOARD_SIZE }, getRandomColor)
    );
  } while (checkMatches(board).length > 0);
  return board;
};
