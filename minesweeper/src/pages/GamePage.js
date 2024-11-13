import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { GameContext } from '../contexts/GameContext';
import Header from '../components/Header';
import Board from '../components/Board';

const GamePage = () => {
  const { difficulty } = useParams();
  const { resetGame } = useContext(GameContext);

  React.useEffect(() => {
    resetGame(difficulty);
  }, [difficulty, resetGame]);

  return (
    <div className="centered-page">
      <Header />
      <Board />
    </div>
  );
};

export default GamePage;