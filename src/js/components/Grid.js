import React from 'react';

import { getTileSize } from '../config/config';
import GridBackground from './GridBackground';
import TileMatrixContainer from '../containers/TileMatrixContainer';

const Grid = ({ gridSize }) => {

	var tileSize = getTileSize(gridSize);

	return (
		<section className="grid">
			<GridBackground gridSize={gridSize} tileSize={tileSize} />
			<TileMatrixContainer />
		</section>
	);
};

export default Grid;
