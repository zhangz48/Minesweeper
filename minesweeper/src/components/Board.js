import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import Cell from './Cell';

const Board = () => {
  const { board, difficulty, gameStatus } = useContext(GameContext); // Assuming gameStatus is available in the context

  // Set the number of columns based on difficulty
  const columns = difficulty === 'medium' ? 16 : difficulty === 'hard' ? 30 : 8;

  // Set overlay message based on game status
  const overlayMessage =
    gameStatus === 'won' ? 'Game Over! You Won!' :
    gameStatus === 'lost' ? 'Game Over! You Lost!' :
    '';

  return (
    <div className="board-container">
      {overlayMessage && (
        <div className="overlay">
          <div className="overlay-message">{overlayMessage}</div>
        </div>
      )}
      <div className="board" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {board.flat().map((cell, index) => (
          <Cell
            key={index}
            cell={cell}
            rowIndex={Math.floor(index / board[0].length)}
            colIndex={index % board[0].length}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;