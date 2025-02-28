import React, { useEffect, useState } from "react";
import { checkMatches } from "../utils/check-matches";
import { BOARD_SIZE, createBoard } from "../utils/create-board";
import { getRandomTile } from "../utils/get-random-tile";
import Tile from "./Tile";

export interface ITile {
  color: string | null;
  id: number;
}

const GameBoard = () => {
  const [board, setBoard] = useState<ITile[][]>(createBoard);
  // Currently selected tile for swapping.
  const [selected, setSelected] = useState<[number, number] | null>(null);

  const swapTiles = (pos1: [number, number], pos2: [number, number]) => {
    const newBoard = board.map((row) => [...row]);
    [newBoard[pos1[0]][pos1[1]], newBoard[pos2[0]][pos2[1]]] = [
      newBoard[pos2[0]][pos2[1]],
      newBoard[pos1[0]][pos1[1]],
    ];
    return newBoard;
  };

  const handleClick = (row: number, col: number) => {
    if (!selected) {
      setSelected([row, col]);
    } else {
      const [sRow, sCol] = selected;
      if (
        (Math.abs(sRow - row) === 1 && sCol === col) || // Vertical swap
        (Math.abs(sCol - col) === 1 && sRow === row) // Horizontal swap
      ) {
        const newBoard = swapTiles([sRow, sCol], [row, col]);
        const prevBoard = board;

        // Update the board state
        setBoard(newBoard);

        // If the swap doesn't result in a match, revert the swap
        if (checkMatches(newBoard).length <= 0) {
          setTimeout(() => setBoard(prevBoard), 500);
        }
      }
      setSelected(null);
    }
  };

  // Effect that checks changing in the board and update the board if it has matches
  useEffect(() => {
    const handleMatches = () => {
      let matches = checkMatches(board);
      if (matches.length === 0) return;

      let newBoard = board.map((row) => [...row]);
      // Remove matched tiles by setting their color to null
      matches.forEach(([row, col]) => (newBoard[row][col].color = null));

      // Update the board with empty tiles
      setBoard([...newBoard]);
      // Iterate through each column to shift down tiles and fill empty spaces
      setTimeout(() => {
        let filledBoard = newBoard.map((row) => [...row]);

        for (let col = 0; col < BOARD_SIZE; col++) {
          let emptySpaces = 0;
          for (let row = BOARD_SIZE - 1; row >= 0; row--) {
            if (filledBoard[row][col].color === null) {
              emptySpaces++;
            } else if (emptySpaces > 0) {
              // Move the tile down by the number of empty spaces
              filledBoard[row + emptySpaces][col] = {
                ...filledBoard[row][col],
              };
              filledBoard[row][col].color = null;
            }
          }
          // Generate new tiles at the top to fill the empty spaces
          for (let i = 0; i < emptySpaces; i++) {
            filledBoard[i][col] = getRandomTile();
          }
        }
        // Update the board with new tiles
        setBoard([...filledBoard]);
      }, 300);
    };

    setTimeout(handleMatches, 500);
  }, [board]);

  return (
    <div className="game-board">
      {board.map((row, rowIndex) =>
        row.map((tile, colIndex) => (
          <Tile
            isActive={
              !!selected && selected[0] === rowIndex && selected[1] === colIndex
            }
            key={tile.id}
            color={tile.color}
            onClick={() => handleClick(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
};

export default GameBoard;
