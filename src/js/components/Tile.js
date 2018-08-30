import React from 'react';

import { getLeftStyleByIndex, getTopStyleByIndex, getTileSize, getTileFontSize } from '../config/config';

/**
 * Renders the tile - a square on the grid representing a number.
 *
 * @param  y               y coord
 * @param  x               x coord
 * @param  value           the number represented by this tile
 * @param  gridSize        the size of the grid in integer
 * @param  isAppearing     indicates if this tile appears out of nowhere
 * @param  shouldDestroy   indicates if this tile should be destroyed due to a merger with another one
 * @param  shouldIncrement indicates if this tile should increase its value due to a merger with another one
 * @param  steps           indicates how many steps, if any, this tile moves
 * @param  yDirection      -1|0|1: the direction on the vertical axis
 * @param  xDirection      -1|0|1: the direction on the horizontal axis
 * @param  isUndoRedo      is undo/redo currently performing as an operation
 */
const Tile = ({ y, x, value, gridSize, isAppearing, shouldDestroy, shouldIncrement, steps, yDirection, xDirection, isUndoRedo }) => {

	var className = `${isAppearing ? 'appearing' : ''}${steps > 0 ? ' moving' : ''}${shouldDestroy ? ' destroying' : ''}${shouldIncrement ? ' incrementing' : ''}`;
	var tileSize = getTileSize(gridSize);
	var fontSize = getTileFontSize(gridSize);
	fontSize = (shouldIncrement && value * 2 > 1000) || (!shouldIncrement && value > 1000) ? fontSize * 0.75 : fontSize;

	var ySteps = steps > 0 ? steps * yDirection : 0;
	var xSteps = steps > 0 ? steps * xDirection : 0;

	var dom = null;

	// using setTimeout as the onAnimationFrame event is not reliable enough :(
	setTimeout(() => {
		if (dom) {
			dom.innerHTML = dom.getAttribute('data-value');
		}
	}, 250);

	var mergedValue = value * (shouldIncrement ? 2 : 1);

	return (
		<div className={className} data-value={mergedValue} ref={el => dom = el} style={{
			top: getTopStyleByIndex(y + ySteps, gridSize),
			left: getLeftStyleByIndex(x + xSteps, gridSize),
			width: tileSize,
			height: tileSize,
			fontSize: fontSize
		}}
		>{isUndoRedo ? mergedValue : value}</div>
	);
};

export default Tile;
