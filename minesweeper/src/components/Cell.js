import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';

const Cell = ({ cell, rowIndex, colIndex }) => {
  const { board, setBoard, gameStatus, setGameStatus, isFirstTurn, setIsFirstTurn, flagCount, setFlagCount } = useContext(GameContext);

  const handleClick = () => {
    if (gameStatus !== 'playing' || cell.isRevealed || cell.isFlagged) return;

    if (isFirstTurn) {
      setIsFirstTurn(false);
      if (cell.isBomb) {
        relocateBomb(rowIndex, colIndex);
      }
    }

    if (cell.isBomb) {
      setGameStatus('lost');
      revealAllBombs(rowIndex, colIndex);
    } else {
      revealCell(rowIndex, colIndex);
      if (checkWinCondition(board)) {
        setGameStatus('won');
      }
    }
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    if (gameStatus !== 'playing' || cell.isRevealed) return;

    const newBoard = [...board];

    if (cell.isFlagged) {
      newBoard[rowIndex][colIndex].isFlagged = false;
      setFlagCount(flagCount + 1);
    } else if (flagCount > 0) {
      newBoard[rowIndex][colIndex].isFlagged = true;
      setFlagCount(flagCount - 1);
    }

    setBoard(newBoard);
  };

  const relocateBomb = (bombRow, bombCol) => {
    const newBoard = [...board];
    let relocated = false;

    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[0].length; col++) {
        if (!newBoard[row][col].isBomb && !(row === bombRow && col === bombCol)) {
          newBoard[row][col].isBomb = true;
          newBoard[bombRow][bombCol].isBomb = false;
          relocated = true;
          break;
        }
      }
      if (relocated) break;
    }

    // Recalculate adjacent mines after moving the bomb
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[0].length; col++) {
        if (!newBoard[row][col].isBomb) {
          newBoard[row][col].adjacentMines = calculateAdjacentMines(newBoard, row, col);
        }
      }
    }

    setBoard(newBoard);
  };

  const calculateAdjacentMines = (board, row, col) => {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],         [0, 1],
      [1, -1], [1, 0], [1, 1],
    ];

    return directions.reduce((count, [dx, dy]) => {
      const newRow = row + dx;
      const newCol = col + dy;
      return count + (board[newRow] && board[newRow][newCol] && board[newRow][newCol].isBomb ? 1 : 0);
    }, 0);
  };

  const revealAllBombs = (triggeredRow, triggeredCol) => {
    const newBoard = board.map((row, rIdx) =>
      row.map((cell, cIdx) => ({
        ...cell,
        isRevealed: cell.isBomb || cell.isRevealed,
        isTriggeredBomb: rIdx === triggeredRow && cIdx === triggeredCol ? true : cell.isTriggeredBomb,
      }))
    );
    setBoard(newBoard);
  };

  const revealCell = (row, col) => {
    if (
      row < 0 ||
      col < 0 ||
      row >= board.length ||
      col >= board[0].length ||
      board[row][col].isRevealed ||
      board[row][col].isFlagged
    ) {
      return;
    }

    const newBoard = [...board];
    newBoard[row][col].isRevealed = true;

    if (newBoard[row][col].adjacentMines === 0) {
      const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],         [0, 1],
        [1, -1], [1, 0], [1, 1]
      ];

      directions.forEach(([dx, dy]) => {
        revealCell(row + dx, col + dy);
      });
    }

    setBoard(newBoard);
  };

  const checkWinCondition = (newBoard) => {
    return newBoard.every(row =>
      row.every(cell => (cell.isBomb && !cell.isRevealed) || (!cell.isBomb && cell.isRevealed))
    );
  };

  return (
    <div
      className={`cell ${cell.isRevealed ? 'revealed' : ''} ${cell.isFlagged ? 'flagged' : ''} ${
        cell.isTriggeredBomb ? 'triggered-bomb' : ''
      } ${cell.isRevealed && cell.adjacentMines > 0 ? `number-${cell.adjacentMines}` : ''}`}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {cell.isRevealed && (cell.isBomb ? '💣' : cell.adjacentMines || '')}
      {cell.isFlagged && !cell.isRevealed && '🚩'}
    </div>
  );
};

export default Cell;