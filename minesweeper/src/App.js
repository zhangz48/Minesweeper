import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import RulesPage from './pages/RulesPage';
import Navbar from './components/Navbar';

const App = () => (
  <GameProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game/:difficulty" element={<GamePage />} />
        <Route path="/rules" element={<RulesPage />} />
      </Routes>
    </Router>
  </GameProvider>
);

export default App;