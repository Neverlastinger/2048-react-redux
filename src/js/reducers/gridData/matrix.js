// *************************
// This file contains functions related to matrix manipulations
// *************************

/**
 * Returns the static matrix from the given matrixInTransition.
 *
 * @param  matrixInTransition
 * @param  direction: contains:
 * 				- yDirection: -1|0|1: the direction on the vertical axis
 * 				- xDirection: -1|0|1: the direction on the horizontal axis
 * @return staticMatrix
 */
export const getStaticMatrix = (matrixInTransition, { yDirection, xDirection} ) => {

	var matrix = JSON.parse(JSON.stringify(matrixInTransition));

	if (yDirection !== 0) {
		return processVertically(matrix, { yDirection, xDirection })
	}

	return processHorizontally(matrix, { yDirection, xDirection })
};

const processHorizontally = (matrix, { yDirection, xDirection }) => {

	var len = matrix.length;

	for (var _y = 0; _y < len; _y++) {
		var y = yDirection === 1 ? len - 1 - _y : _y;
		for (var _x = 0; _x < len; _x++) {
			var x = xDirection === 1 ? len - 1 - _x : _x;
			processItem(matrix, { y, x, xDirection, yDirection });
		}
	}

	return matrix;
};

const processVertically = (matrix, { yDirection, xDirection }) => {

	var len = matrix.length;

	for (var _x = 0; _x < len; _x++) {
		var x = xDirection === 1 ? len - 1 - _x : _x;
		for (var _y = 0; _y < len; _y++) {
			var y = yDirection === 1 ? len - 1 - _y : _y;
			processItem(matrix, { y, x, xDirection, yDirection });
		}
	}

	return matrix;
};

const processItem = (matrix, { y, x, yDirection, xDirection }) => {

	if (matrix[y][x] === null) {
		return;
	}
	if (matrix[y][x].destroy) {
		matrix[y][x] = null;
		return;
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
};

/**
 * Returns the new matrixInTransition in response to a move.
 *
 * @param  state: old (current state) before the move is implemented
 * @param  direction: contains:
 * 				- yDirection: -1|0|1: the direction on the vertical axis
 * 				- xDirection: -1|0|1: the direction on the horizontal axis
 * @return matrixInTransition
 */
export const move = (state, { yDirection, xDirection }) => {

	if (yDirection !== 0) {
		return moveVertical(state, { yDirection, xDirection });
	}

	let matrix = state.matrixStatic;
	let matrixInTransition = JSON.parse(JSON.stringify(matrix));
	var len = state.matrixStatic.length;

	for (var y = 0; y < len; y++) {

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

const moveVertical = (state, { yDirection, xDirection }) => {

	let matrix = state.matrixStatic;
	let matrixInTransition = JSON.parse(JSON.stringify(matrix));
	var len = state.matrixStatic.length;

	for (var x = 0; x < len; x++) {

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

/**
 * Creates an empty NxN matrix with the given size. Every element === null.
 *
 * @param  size: N in NxN
 * @return matrix: a new matrix with null values
 */
export const createEmptyMatrix = (size) => (
	Array(size).fill(null).map(() => Array(size).fill(null))
);

var currentKey = 1; // incrementing index; a React key used to preven React rerendering all tiles on every render

/**
 * Sets a random tile with a value of 2 or 4 in a random place at the given matrix.
 *
 * @param  matrixStatic: a matrix with at least 1 null value
 * @return tile: the newly created tile
 */
export const setRandomTile = (matrixStatic) => {

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

const getRandom2or4 = () => (
	(parseInt(Math.random() * 10, 10) % 2 + 1) * 2
);
