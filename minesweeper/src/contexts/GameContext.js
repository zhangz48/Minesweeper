import React, { createContext, useState, useEffect, useCallback } from 'react';

export const GameContext = createContext();

const generateBoard = (difficulty) => {
  let rows, cols, mines;
  switch (difficulty) {
    case 'easy':
      rows = 8;
      cols = 8;
      mines = 10;
      break;
    case 'medium':
      rows = 16;
      cols = 16;
      mines = 40;
      break;
    case 'hard':
      rows = 16;
      cols = 30;
      mines = 99;
      break;
    default:
      rows = 8;
      cols = 8;
      mines = 10;
  }

  const board = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isBomb: false,
      isRevealed: false,
      isFlagged: false,
      adjacentMines: 0,
    }))
  );

  let minesPlaced = 0;
  while (minesPlaced < mines) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (!board[row][col].isBomb) {
      board[row][col].isBomb = true;
      minesPlaced++;
    }
  }

  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], /* current cell */ [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!board[row][col].isBomb) {
        let count = 0;
        directions.forEach(([dx, dy]) => {
          const newRow = row + dx;
          const newCol = col + dy;
          if (board[newRow] && board[newRow][newCol] && board[newRow][newCol].isBomb) {
            count++;
          }
        });
        board[row][col].adjacentMines = count;
      }
    }
  }

  return board;
};

// Function to save game state to localStorage
const saveGameState = (state) => {
  localStorage.setItem('minesweeperGameState', JSON.stringify(state));
};

// Function to load game state from localStorage
const loadGameState = () => {
  const savedState = localStorage.getItem('minesweeperGameState');
  return savedState ? JSON.parse(savedState) : null;
};

export const GameProvider = ({ children }) => {
  const savedState = loadGameState();

  const [difficulty, setDifficulty] = useState(savedState?.difficulty || 'easy');
  const [board, setBoard] = useState(savedState?.board || generateBoard(difficulty));
  const [gameStatus, setGameStatus] = useState(savedState?.gameStatus || 'playing');
  const [isFirstTurn, setIsFirstTurn] = useState(savedState?.isFirstTurn ?? true);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    saveGameState({ difficulty, board, gameStatus, isFirstTurn });
  }, [difficulty, board, gameStatus, isFirstTurn]);

  const resetGame = useCallback((newDifficulty) => {
    setDifficulty(newDifficulty);
    const newBoard = generateBoard(newDifficulty);
    setBoard(newBoard);
    setGameStatus('playing');
    setIsFirstTurn(true);
    saveGameState({ difficulty: newDifficulty, board: newBoard, gameStatus: 'playing', isFirstTurn: true });
  }, []);

  return (
    <GameContext.Provider value={{
      difficulty,
      board,
      setBoard,
      gameStatus,
      setGameStatus,
      resetGame,
      isFirstTurn,
      setIsFirstTurn
    }}>
      {children}
    </GameContext.Provider>
  );
};