import React from 'react';

import { getTileSize } from '../config/config';
import GridBackground from './GridBackground';
import GameOverLayer from './GameOverLayer';
import TileMatrixContainer from '../containers/TileMatrixContainer';

/**
 * Displays the game grid.
 * 
 * @param gridSize: integer, grid size
 * @param isGameOver: true|false
 */
const Grid = ({ gridSize, isGameOver }) => (
	<section className="grid">
		<GridBackground gridSize={gridSize} tileSize={getTileSize(gridSize)} />
		<TileMatrixContainer />
		{ isGameOver ? <GameOverLayer /> : null }
	</section>
);

export default Grid;
