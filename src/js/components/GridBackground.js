import React from 'react';

import { getLeftStyleByIndex, getTopStyleByIndex } from '../config/config';

/**
 * Renders the grid background (empty squares).
 *
 * @param gridSize: the size of the grid, 4x4 by default
 * @param tileSize: size of a square
 */
const GridBackground = ({ gridSize, tileSize }) => (

	<div className="background">
		{[...Array(gridSize)].map((_, x) =>
			[...Array(gridSize)].map((_, y) =>
				<div key={x + '' + y}
					style={{
						left: getLeftStyleByIndex(x, gridSize),
						top: getTopStyleByIndex(y, gridSize),
						width: tileSize,
						height: tileSize
					}}></div>
			)
		)}
	</div>
);

export default GridBackground;
