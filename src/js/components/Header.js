import React from 'react';

/**
 * Represents the header of the page layout.
 *
 * @param gridSize: the size of the grid (4 by default)
 * @param increaseGridSize: increases the grid size for the next game
 * @param decreaseGridSize: decreases the grid size for the next game
 * @param undo: performs an undo
 * @param redo: performs a redo
 * @param startNewGame: starts a new game
 */
const Header = ({ gridSize, increaseGridSize, decreaseGridSize, undo, redo, startNewGame }) => (

	<section className="header">
		<header>
			<h1>2048</h1>
			<span>Demo by Radoslav Popov</span>
		</header>
		<div className="indicators">
			<div>
				<span>Score</span>
				<span>0</span>
			</div>
			<div>
				<span>Best</span>
				<span>0</span>
			</div>
		</div>
		<div className="new-game" onClick={startNewGame}>
			<span>New game</span>
			<span className="size">{gridSize}x{gridSize}</span>
		</div>
		<div className="game-size-buttons">
			<span className="up" onClick={increaseGridSize}>^</span>
			<span className="down" onClick={decreaseGridSize}>^</span>
		</div>
		<div className="undo-redo">
			<div className="undo" onClick={undo}>Undo</div>
			<div className="redo" onClick={redo}>Redo</div>
		</div>
	</section>
);

export default Header;
