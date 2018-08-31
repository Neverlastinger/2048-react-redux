// *************************
// This file contains functions related to matrix manipulations
// *************************
import { v4 } from 'node-uuid';

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
 * @param  matrixStatic: old (current matrixStatic) before the move is implemented
 * @param  direction: contains:
 * 				- yDirection: -1|0|1: the direction on the vertical axis
 * 				- xDirection: -1|0|1: the direction on the horizontal axis
 * @return matrixInTransition
 */
export const move = (matrixStatic, { yDirection, xDirection }) => {

	if (yDirection !== 0) {
		return moveVertical(matrixStatic, { yDirection, xDirection });
	}

	let matrixInTransition = JSON.parse(JSON.stringify(matrixStatic));
	var len = matrixInTransition.length;

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

const moveVertical = (matrixStatic, { yDirection, xDirection }) => {

	let matrixInTransition = JSON.parse(JSON.stringify(matrixStatic));
	var len = matrixInTransition.length;

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
	var tile = { value: getRandom2or4(), key: v4(), appearing: true, y: randomIndex[0], x: randomIndex[1] };
	matrixStatic[randomIndex[0]][randomIndex[1]] = tile;

	return tile;
};

const getRandom2or4 = () => (
	(parseInt(Math.random() * 10, 10) % 2 + 1) * 2
);

/**
 * Checks whether the given matrix is full with tiles (no empty spaces).
 *
 * @param  matrix: two dimentional array
 * @return isFull: true|false
 */
export const isMatrixFull = (matrix) => {

	for (var y = 0; y < matrix.length; y++) {
		if (matrix[y].some((tile) => ( tile === null ))) {
			return false;
		}
	}

	return true;
};

/**
 * Checks if there are no more legal moves the player can take according to the given matrix of tiles.
 *
 * @param  matrix: static matrix with tiles
 * @return noMoves: true|false
 */
export const noLegalMoves = (matrix) => {

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
};

/**
 * Gets the number of points scored by the given matrix
 *
 * @param  matrixInTransition
 * @return points: integer
 */
export const getPoints = (matrixInTransition) => {

	var points = 0;

	matrixInTransition.forEach((row) => {
		row.forEach((tile) => {
			points += tile && tile.increment ? tile.value * 2 : 0;
		})
	});

	return points;
};

/**
 * Checks if no moves are performed according to the given matrix.
 *
 * @param  matrixInTransition
 * @return noMoves: true|false
 */
export const noMovesPerformed = (matrixInTransition) => {

	var result = true;

	matrixInTransition.forEach((row) => {
		row.forEach((tile) => {
			if (tile && tile.steps && tile.steps > 0) {
				result = false;
			}
		})
	});

	return result;
}

/**
 * Checks whether the win condition is present in the given matrix.
 * @param  matrix: staticMatrix
 * @return win: true|false
 */
export const isWinCondition = (matrix) => {

	var win = false;

	matrix.forEach((row) => {
		if (row.some((tile) => ( tile && tile.value === 2048 ))) {
			win = true;
		}
	});

	return win;
}
