import React from 'react';

const RulesPage = () => (
    <div className="centered-page">
        <h2>How to Play Minesweeper</h2>
        <p>
            The goal of Minesweeper is to reveal all the cells on the board without hitting any bombs.
            Use logic and hints provided by the numbers in the revealed cells to avoid the bombs.
        </p>

        <h3>Rules</h3>
        <ul>
            <li>Click on a cell to reveal it.</li>
            <li>If you reveal a bomb, the game is over.</li>
            <li>
                If the cell contains a number, it indicates the number of bombs in the eight surrounding cells.
            </li>
            <li>
                If the cell has no bombs nearby, it will display as blank and automatically reveal adjacent cells.
            </li>
            <li>
                Right-click to place a flag on cells you suspect contain bombs. Flags help
                track potential bomb locations.
            </li>
            <li>To win the game, reveal all cells that do not contain bombs.</li>
        </ul>

        <h3>Tips</h3>
        <ul>
            <li>The first click is always safe! You won't hit a bomb on your first move.</li>
            <li>Use flags strategically to mark suspected bombs, especially in high-density areas.</li>
            <li>
                If you reveal a cell with a "0," it means there are no bombs in the surrounding cells, and
                those cells will automatically reveal.
            </li>
            <li>Play carefully, and use numbers as clues to avoid bombs.</li>
        </ul>

        <h3>Game Controls</h3>
        <ul>
            <li><strong>Click:</strong> Reveal the cell.</li>
            <li><strong>Right-click:</strong> Place a flag to mark suspected bombs.</li>
            <li><strong>Reset:</strong> Start a new game with the same difficulty.</li>
            <li><strong>Difficulty Levels:</strong> Choose from Easy, Medium, or Hard to adjust the board size and number of bombs.</li>
        </ul>

        <p>Good luck, and enjoy the game!</p>
    </div>
);

export default RulesPage;