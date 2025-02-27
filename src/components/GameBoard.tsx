import React, { useEffect, useState } from "react";
import { checkMatches } from "../utils/check-matches";
import { BOARD_SIZE, createBoard } from "../utils/create-board";
import { getRandomColor } from "../utils/get-random-color";
import Tile from "./Tile";

const GameBoard = () => {
  const [board, setBoard] = useState<(string | null)[][]>(createBoard);
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
        (Math.abs(sRow - row) === 1 && sCol === col) ||
        (Math.abs(sCol - col) === 1 && sRow === row)
      ) {
        const newBoard = swapTiles([sRow, sCol], [row, col]);
        const prevBoard = board;

        setBoard(newBoard);

        if (checkMatches(newBoard).length <= 0) {
          setTimeout(() => setBoard(prevBoard), 500);
        }
      }
      setSelected(null);
    }
  };

  useEffect(() => {
    const handleMatches = () => {
      let matches = checkMatches(board);
      if (matches.length === 0) return;

      let newBoard = board.map((row) => [...row]);
      matches.forEach(([row, col]) => (newBoard[row][col] = null));

      setBoard([...newBoard]);

      setTimeout(() => {
        let filledBoard = newBoard.map((row) => [...row]);

        for (let col = 0; col < BOARD_SIZE; col++) {
          let emptySpaces = 0;
          for (let row = BOARD_SIZE - 1; row >= 0; row--) {
            if (filledBoard[row][col] === null) {
              emptySpaces++;
            } else if (emptySpaces > 0) {
              filledBoard[row + emptySpaces][col] = filledBoard[row][col];
              filledBoard[row][col] = null;
            }
          }
          for (let i = 0; i < emptySpaces; i++) {
            filledBoard[i][col] = getRandomColor();
          }
        }

        setBoard([...filledBoard]);
      }, 300);
    };

    setTimeout(handleMatches, 500);
  }, [board]);

  return (
    <div className="game-board">
      {board.map((row, rowIndex) =>
        row.map((color, colIndex) => (
          <Tile
            isActive={
              !!selected && selected[0] === rowIndex && selected[1] === colIndex
            }
            key={`${rowIndex}-${colIndex}`}
            color={color}
            onClick={() => handleClick(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
};

export default GameBoard;
