import React from 'react';

import { UP, DOWN, LEFT, RIGHT } from '../config/keyCodes';
import Tile from './Tile';

export default class TileMatrix extends React.Component {

    componentDidMount() {

		var { onLeft, onRight, onUp, onDown } = this.props;

		document.addEventListener('keyup', (e) => {
			if (e.keyCode === LEFT) {
				onLeft();
			}
			if (e.keyCode === RIGHT) {
				onRight();
			}
			if (e.keyCode === UP) {
				onUp();
			}
			if (e.keyCode === DOWN) {
				onDown();
			}
		});
    }

    render() {

		var { matrixInTransition, gridSize, yDirection, xDirection, appearingTile, isUndoRedo } = this.props;

		var tiles = [];

		matrixInTransition.forEach((row, y) =>
			row.forEach((data, x) => {
				if (data === null) {
					return null;
				}
				data.y = y;
				data.x = x;
				tiles.push(data);
			})
		);

		if (appearingTile) {
			tiles.push(appearingTile);
		}

		tiles.sort((tile1, tile2) => {
			return tile1.key - tile2.key;
		})

        return (
			<div className="game-layer">
				{tiles.map((data, y) => (
					<Tile
						key={data.key}
						id={data.key}
						value={data.value}
						isAppearing={data.appearing}
						steps={data.steps}
						shouldDestroy={data.destroy}
						shouldIncrement={data.increment}
						y={data.y}
						x={data.x}
						yDirection={yDirection}
						xDirection={xDirection}
						gridSize={gridSize}
						isUndoRedo={isUndoRedo} />
				))}
			</div>
		)
    }
};
