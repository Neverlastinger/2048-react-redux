//
// Tile = {
// 		key: unique
// 		value: 2, 4, 8....
// 		steps: 1, 2, 3, ...
// 		increment: true|undefined
// 		destroy: true|undefined
// 		appearing: true|undefined
// }
//
//
//
//

const DEFAULT_GRID_SIZE = 4;
var currentKey = 1;

const createEmptyMatrix = (size) => (
	Array(size).fill(null).map(() => Array(size).fill(null))
);

const getRandom2or4 = () => (
	(parseInt(Math.random() * 10, 10) % 2 + 1) * 2
);

const setRandomTile = (matrixStatic) => {

	var indexes = [];
	var len = matrixStatic.length;

	for (var y = 0; y < len; y++) {
		for (var x = 0; x < len; x++) {
			if (matrixStatic[y][x] === null) {
				indexes.push([y, x]);
			}
		}
	}

	var randomIndex = indexes[Math.floor(Math.random() * indexes.length)];
	var tile = { value: getRandom2or4(), key: currentKey++, appearing: true, y: randomIndex[0], x: randomIndex[1] };
	matrixStatic[randomIndex[0]][randomIndex[1]] = tile;

	return tile;
};

const getStaticMatrix = (matrixInTransition, yDirection, xDirection) => {

	var matrix = JSON.parse(JSON.stringify(matrixInTransition));
	var len = matrix.length;

	for (var _y = 0; _y < len; _y++) {

		var y = yDirection === 1 ? len - 1 - _y : _y;

		for (var _x = 0; _x < len; _x++) {

			var x = xDirection === 1 ? len - 1 - _x : _x;

			if (yDirection !== 0) {
				var temp = x;
				x = y;
				y = temp;
			}

			if (matrix[y][x] === null) {
				continue;
			}
			if (matrix[y][x].destroy) {
				matrix[y][x] = null;
				continue;
			}
			if (matrix[y][x].increment) {
				matrix[y][x].value = 2 * matrix[y][x].value;
				matrix[y][x].increment = undefined;
			}
			if (matrix[y][x].appearing) {
				matrix[y][x].appearing = undefined;
			}
			if (matrix[y][x].steps) {
				var steps = matrix[y][x].steps;
				matrix[y][x].steps = undefined;
				matrix[y + steps * yDirection][x + steps * xDirection] = matrix[y][x];
				matrix[y][x] = null;
			}
		}
	}

	return matrix;
};

const getStaticMatrixVertical = (matrixInTransition, yDirection, xDirection) => {

	var matrix = JSON.parse(JSON.stringify(matrixInTransition));
	var len = matrix.length;

	for (var _x = 0; _x < len; _x++) {

		var x = xDirection === 1 ? len - 1 - _x : _x;

		for (var _y = 0; _y < len; _y++) {

			var y = yDirection === 1 ? len - 1 - _y : _y;

			if (matrix[y][x] === null) {
				continue;
			}
			if (matrix[y][x].destroy) {
				matrix[y][x] = null;
				continue;
			}
			if (matrix[y][x].increment) {
				matrix[y][x].value = 2 * matrix[y][x].value;
				matrix[y][x].increment = undefined;
			}
			if (matrix[y][x].appearing) {
				matrix[y][x].appearing = undefined;
			}
			if (matrix[y][x].steps) {
				var steps = matrix[y][x].steps;
				matrix[y][x].steps = undefined;
				matrix[y + steps * yDirection][x + steps * xDirection] = matrix[y][x];
				matrix[y][x] = null;
			}
		}
	}

	return matrix;
};

var matrixInTransition = createEmptyMatrix(DEFAULT_GRID_SIZE);
var matrixStatic = getStaticMatrix(matrixInTransition, 0, 0);
var tile = setRandomTile(matrixStatic);
matrixInTransition[tile.y][tile.x] = tile;
tile = setRandomTile(matrixStatic);
matrixInTransition[tile.y][tile.x] = tile;

const defaultState = {
	nextGameSize: DEFAULT_GRID_SIZE,
	currentSize: DEFAULT_GRID_SIZE,
	yDirection: 0,
	xDirection: 0,
	matrixInTransition,
	matrixStatic,
	appearingTile: null
};

/**
 * Redux Reducer for the grid data.
 */
const gridData = (state = Object.assign({}, defaultState), action) => {

	switch (action.type) {
        // case 'CHANGE_GRID_SIZE':
        //     return {
		// 		...state,
		// 		currentSize: action.size
		// 	};
		case 'CHANGE_GRID_SIZE':
			return {
				...state,
				currentSize: action.size
			};
		case 'CHANGE_NEXT_GAME_SIZE':
			return {
				...state,
				nextGameSize: action.size
			};
		case 'GO_LEFT':

			var matrixInTransition = move(state, 0, -1);

			var matrixStatic = getStaticMatrix(matrixInTransition, 0, -1);
			return {
				...state,
				yDirection: 0,
				xDirection: -1,
				matrixInTransition,
				matrixStatic,
				appearingTile: setRandomTile(matrixStatic)
			};

		case 'GO_RIGHT':

			var matrixInTransition = move(state, 0, 1);
			var matrixStatic = getStaticMatrix(matrixInTransition, 0, 1);

			return {
				...state,
				yDirection: 0,
				xDirection: 1,
				matrixInTransition,
				matrixStatic,
				appearingTile: setRandomTile(matrixStatic)
			};

		case 'GO_UP':

			var matrixInTransition = moveVertical(state, -1, 0);
			var matrixStatic = getStaticMatrixVertical(matrixInTransition, -1, 0);

			return {
				...state,
				yDirection: -1,
				xDirection: 0,
				matrixInTransition,
				matrixStatic,
				appearingTile: setRandomTile(matrixStatic)
			};

		case 'GO_DOWN':

			var matrixInTransition = moveVertical(state, 1, 0);
			var matrixStatic = getStaticMatrixVertical(matrixInTransition, 1, 0);

			return {
				...state,
				yDirection: 1,
				xDirection: 0,
				matrixInTransition,
				matrixStatic,
				appearingTile: setRandomTile(matrixStatic)
			};

		// case 'START_NEW_GAME':
		//
		// 	var matrixInTransition = createEmptyMatrix(state.currentSize);
		// 	setRandomTile(matrixInTransition);
		// 	setRandomTile(matrixInTransition);
		//
		// 	return {
		// 		...state,
		// 		matrixInTransition: createEmptyMatrix(state.currentSize),
		// 		matrixStatic: createEmptyMatrix(state.currentSize)
		// 	}
        default:
            return state;
    }
}

/**
 * Returns the new matrixInTransition when the player moves the tiles.
 *
 * @param  state      old (current state) before the move is implemented
 */
const move = (state, yDirection, xDirection) => {

	let matrix = state.matrixStatic;
	var len = state.matrixStatic.length;
	let matrixInTransition = JSON.parse(JSON.stringify(matrix));

	for (var _y = 0; _y < len; _y++) {

		var y = yDirection === 1 ? len - 1 - _y : _y;

		let currentValue = null;
		let currentValueX = null;
		let currentEmptySpots = 0;

		for (var _x = 0; _x < len; _x++) {

			var x = xDirection === 1 ? len - 1 - _x : _x;

			if (matrixInTransition[y][x] === null) {
				currentEmptySpots++;
				continue;
			}

			if (matrixInTransition[y][x].value === currentValue) {
				matrixInTransition[y][currentValueX].increment = true; // increment the previous tile as it is the same
				matrixInTransition[y][x].steps = currentEmptySpots + 1; // move
				matrixInTransition[y][x].destroy = true; // go away after the merge
				currentEmptySpots++; // additional spot is left empty after the merge
				currentValue = null; // no more merges
				currentValueX = null // no more merges
			} else {
				currentValue = matrixInTransition[y][x].value;
				currentValueX = x;
				if (currentEmptySpots > 0) {
					matrixInTransition[y][x].steps = currentEmptySpots;
				}
			}
		}
	}

	return matrixInTransition;
};

const moveVertical = (state, yDirection, xDirection) => {

	let matrix = state.matrixStatic;
	var len = state.matrixStatic.length;
	let matrixInTransition = JSON.parse(JSON.stringify(matrix));

	for (var _x = 0; _x < len; _x++) {

		var x = xDirection === 1 ? len - 1 - _x : _x;

		let currentValue = null;
		let currentValueY = null;
		let currentEmptySpots = 0;

		for (var _y = 0; _y < len; _y++) {

			var y = yDirection === 1 ? len - 1 - _y : _y;

			if (matrixInTransition[y][x] === null) {
				currentEmptySpots++;
				continue;
			}

			if (matrixInTransition[y][x].value === currentValue) {
				matrixInTransition[currentValueY][x].increment = true; // increment the previous tile as it is the same
				matrixInTransition[y][x].steps = currentEmptySpots + 1; // move
				matrixInTransition[y][x].destroy = true; // go away after the merge
				currentEmptySpots++; // additional spot is left empty after the merge
				currentValue = null; // no more merges
				currentValueY = null // no more merges
			} else {
				currentValue = matrixInTransition[y][x].value;
				currentValueY = y;
				if (currentEmptySpots > 0) {
					matrixInTransition[y][x].steps = currentEmptySpots;
				}
			}
		}
	}

	return matrixInTransition;
};

export default gridData;
