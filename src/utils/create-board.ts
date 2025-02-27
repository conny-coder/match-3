import { ITile } from "../components/GameBoard";
import { checkMatches } from "./check-matches";
import { getRandomTile } from "./get-random-color";

export const BOARD_SIZE = 8;

export const createBoard = () => {
  let board: ITile[][];
  do {
    board = Array.from({ length: BOARD_SIZE }, () =>
      Array.from({ length: BOARD_SIZE }, getRandomTile)
    );
  } while (checkMatches(board).length > 0);
  return board;
};
