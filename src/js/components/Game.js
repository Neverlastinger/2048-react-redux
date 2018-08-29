import React from 'react';

import Tile from './Tile';

const Game = ({ matrixInTransition, gridSize }) => (

	<div className="game-layer">
		{matrixInTransition.map((row, x) =>
			row.map((data, y) => {
				if (data === undefined) {
					return null;
				}
				return (
					<Tile
						key={data.key}
						value={data.value}
						isAppearing={data.appearing}
						x={x}
						y={y}
						gridSize={gridSize} />
				);
			})
		)}
	</div>
);

export default Game;
