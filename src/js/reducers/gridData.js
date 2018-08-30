import { createEmptyMatrix, getStaticMatrix, move, setRandomTile } from './gridData/matrix';
import { DEFAULT_GRID_SIZE } from './gridData/default';

const createDefaultState = (gridSize = DEFAULT_GRID_SIZE) => {

	var matrixInTransition = createEmptyMatrix(gridSize);
	var matrixStatic = getStaticMatrix(matrixInTransition, { yDirection: 0, xDirection: 0 });
	var tile = setRandomTile(matrixStatic);
	matrixInTransition[tile.y][tile.x] = tile;
	tile = setRandomTile(matrixStatic);
	matrixInTransition[tile.y][tile.x] = tile;

	return {
		gridSize: gridSize,
		yDirection: 0,
		xDirection: 0,
		matrixInTransition,
		matrixStatic,
		appearingTile: null
	};
}

/**
 * Redux Reducer for the grid data.
 *
 * This reducer keeps:
 * - The size of the grid;
 * - The direction of the last move: xDirection === -1 represents a horizontal move to the left; yDirection === 1 represents a vertical move to the bottom;
 * - The new tile that appears on every turn;
 * - Two matrixes holding the grid state as tiles:
 * 		- matrixInTransition: represents a single move from one state to another. This matrix is used mainly to display animations.
 * 			It is provided to the view and changes every turn based on the matrixStatic.
 * 			After a given tile has been moved, it can be found by its old index here, but with a property indicating the change.
 * 			The same goes for tiles that should be merged with other tiles and consequently increased in value destroyed;
 * 		- matrixStatic: normalized matrix used every turn to create the matrixInTransition. Tiles can be found here by its new index
 *
 * A given tile is represented as an object and it can have the following properties:
 * 		- x, y: the coordinates on the grid, although indexes of the two matrixes are used more often. These properties are used only for the new, appearing tiles;
 * 		- key: unique id of every tile. Necessary to prevent React of rerendering every tile on every render
 * 		- value: the numerical value of the tile: 2, 4, 8, ...
 * 		- increment: true|undefined - indicates if the tile should be merged with another one and increased in value
 * 		- destroy: true|undefined - indicates if the tile should be merged with another one and removed entirely
 * 		- appearing: true|undefined - indicates if this is a new tile emerging from nowhere to the grid
 *
 * @param state
 * @param action
 */
const gridData = (state = Object.assign({}, createDefaultState()), action) => {

	switch (action.type) {
		case 'START_NEW_GAME':

			return Object.assign({}, createDefaultState(action.gridSize));

		case 'GO_LEFT':

			return performMove({
				state,
				yDirection: 0,
				xDirection: -1
			});

		case 'GO_RIGHT':

			return performMove({
				state,
				yDirection: 0,
				xDirection: 1
			});

		case 'GO_UP':

			return performMove({
				state,
				yDirection: -1,
				xDirection: 0
			});

		case 'GO_DOWN':

			return performMove({
				state,
				yDirection: 1,
				xDirection: 0
			});

        default:
            return state;
    }
}

/**
 * Returns the new redux reducer state based on the direction of move.
 *
 * @param  params:
 * 				- state: the old redux reducer state
 * 				- yDirection: -1|0|1: the direction on the vertical axis
 * 				- xDirection: -1|0|1: the direction on the horizontal axis
 * @return state: the new state
 */
const performMove = ({ state, yDirection, xDirection }) => {

	var matrixInTransition = move(state.matrixStatic, { yDirection, xDirection });
	var matrixStatic = getStaticMatrix(matrixInTransition, { yDirection, xDirection });

	var appearingTile = setRandomTile(matrixStatic);

	return {
		...state,
		isGameOver: isMatrixFull(matrixStatic) && noLegalMoves(matrixStatic),
		yDirection,
		xDirection,
		matrixInTransition,
		matrixStatic,
		appearingTile
	};
};

const isMatrixFull = (matrix) => {

	for (var y = 0; y < matrix.length; y++) {
		if (matrix[y].some((tile) => ( tile === null ))) {
			return false;
		}
	}

	return true;
};

const noLegalMoves = (matrix) => {

	var len = matrix.length;
	var value = null;

	const isEq = (y, x) => (
		matrix[y] && matrix[y][x] && matrix[y][x].value === value
	);

	for (var y = 0; y < len; y++) {
		for (var x = 0; x < len; x++) {

			value = matrix[y][x].value;

			if (isEq(y - 1, x) || isEq(y + 1, x) || isEq(y, x - 1) || isEq(y, x + 1)) {
				return false;
			}
		}
	}

	return true;
}

export default gridData;
