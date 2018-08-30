import React from 'react';

import { getLeftStyleByIndex, getTopStyleByIndex, getTileSize, getTileFontSize } from '../config/config';

/**
 * Renders the tile (square on the grid representing numbers).
 */
const Tile = ({ y, x, value, gridSize, isAppearing, shouldDestroy, shouldIncrement, steps, yDirection, xDirection }) => {

	var className = `${isAppearing ? 'appearing' : ''}${steps > 0 ? ' moving' : ''}${shouldDestroy ? ' destroying' : ''}${shouldIncrement ? ' incrementing' : ''}`;
	var tileSize = getTileSize(gridSize);
	var fontSize = getTileFontSize(gridSize);
	fontSize = (shouldIncrement && value * 2 > 1000) || (!shouldIncrement && value > 1000) ? fontSize * 0.75 : fontSize;

	var ySteps = steps > 0 ? steps * yDirection : 0;
	var xSteps = steps > 0 ? steps * xDirection : 0;

	var dom = null;

	if (shouldIncrement) {
		// using setTimeout as the onAnimationFrame event is not reliable enough :(
		setTimeout(() => {
			if (dom) {
				dom.innerHTML = value * 2;
			}
		}, 200);
	}

	return (
		<div className={className} data-value={value * (shouldIncrement ? 2 : 1)} ref={el => dom = el} style={{
			top: getTopStyleByIndex(y + ySteps, gridSize),
			left: getLeftStyleByIndex(x + xSteps, gridSize),
			width: tileSize,
			height: tileSize,
			fontSize: fontSize
		}}
		>{value}</div>
	);
};

export default Tile;
