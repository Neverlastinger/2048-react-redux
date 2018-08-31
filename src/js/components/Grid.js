import React from 'react';

import { getTileSize } from '../config/ui';
import GridBackground from './GridBackground';
import GameOverLayer from './GameOverLayer';
import YouWinLayerContainer from '../containers/YouWinLayerContainer';
import TileMatrixContainer from '../containers/TileMatrixContainer';

/**
 * Displays the game grid.
 *
 * @param gridSize: integer, grid size
 * @param isGameOver: true|false
 * @param youWin: true|false, indicates if 2048 is reached
 */
const Grid = ({ gridSize, isGameOver, youWin }) => (
	<section className="grid">
		<GridBackground gridSize={gridSize} tileSize={getTileSize(gridSize)} />
		<TileMatrixContainer />
		{ isGameOver ? <GameOverLayer /> : null }
		{ youWin ? <YouWinLayerContainer /> : null }
	</section>
);

export default Grid;
