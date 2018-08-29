import React from 'react';

import { getLeftStyleByIndex, getTopStyleByIndex, getTileSize, getTileFontSize } from '../config/config';

var currentValue = null;

/**
 * Renders the tile (square on the grid representing numbers).
 */
const Tile = ({ x, y, value, gridSize, isAppearing }) => {

	var className = isAppearing ? 'appearing' : '';
	var tileSize = getTileSize(gridSize);
	var fontSize = getTileFontSize(gridSize);

	return (
		<div className={className} style={{
			left: getLeftStyleByIndex(x, gridSize),
			top: getTopStyleByIndex(y, gridSize),
			width: tileSize,
			height: tileSize,
			fontSize: fontSize
		}}
		>{isAppearing ? value : currentValue}</div>
	);
};

export default Tile;
