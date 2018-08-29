import React, { Component } from 'react';

import { getTileSize } from '../config/config';
import GridBackground from './GridBackground';
import GameContainer from '../containers/GameContainer';

const Grid = ({ gridSize }) => {

	var tileSize = getTileSize(gridSize);

	return (
		<section className="grid">
			<GridBackground gridSize={gridSize} tileSize={tileSize} />
			<GameContainer />
		</section>
	);
};

export default Grid;
