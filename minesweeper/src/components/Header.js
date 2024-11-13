import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';

const Header = () => {
  const { resetGame, difficulty, flagCount } = useContext(GameContext);

  return (
    <header>
      <h1>Minesweeper</h1>
      <button onClick={() => resetGame(difficulty)}>Reset Game</button>
      <p className="flags-counter">Flags Remaining: <span>{flagCount}</span></p>
    </header>
  );
};

export default Header;