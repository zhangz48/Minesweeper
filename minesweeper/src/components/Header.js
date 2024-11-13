import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';

const Header = () => {
  const { resetGame, difficulty } = useContext(GameContext);

  return (
    <header>
      <h1>Minesweeper</h1>
      <button onClick={() => resetGame(difficulty)}>Reset Game</button>
    </header>
  );
};

export default Header;