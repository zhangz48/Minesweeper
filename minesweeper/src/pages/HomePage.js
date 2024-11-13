import React from 'react';

const HomePage = () => (
  <div className="centered-page">
    <h1>Welcome to Minesweeper</h1>
    <p>
      Challenge yourself with the classic game of Minesweeper! Use logic to reveal safe cells and avoid
      the hidden bombs.
    </p>
    <p>
      Select a difficulty level from the navigation menu above to start a new game:
    </p>
    <ul>
      <li><strong>Easy:</strong> Small grid with fewer bombs - perfect for beginners!</li>
      <li><strong>Medium:</strong> Larger grid with more bombs - a good balance of challenge and fun.</li>
      <li><strong>Hard:</strong> Huge grid with plenty of bombs - only for the brave!</li>
    </ul>
    <p>Good luck, and happy sweeping!</p>
  </div>
);

export default HomePage;