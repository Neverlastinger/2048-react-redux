const DEFAULT_GRID_SIZE = 4;
var currentKey = 1;

const createEmptyMatrix = (size) => (
	Array(size).fill(undefined).map(() => Array(size).fill(undefined))
);

const getRandom2or4 = () => (
	(parseInt(Math.random() * 10) % 2 + 1) * 2
);

const setRandomTile = (matrix) => {

	var indexes = [];

	for (var i = 0; i < matrix.length; i++) {
		for (var j = 0; j < matrix[i].length; j++) {
			if (matrix[i][j] === undefined) {
				indexes.push([i, j]);
			}
		}
	}

	var randomIndex = indexes[Math.floor(Math.random() * indexes.length)];

	matrix[randomIndex[0]][randomIndex[1]] = { value: getRandom2or4(), key: currentKey++, appearing: true };
};

var matrixInTransition = createEmptyMatrix(DEFAULT_GRID_SIZE);
setRandomTile(matrixInTransition);
setRandomTile(matrixInTransition);

const defaultState = {
	nextGameSize: DEFAULT_GRID_SIZE,
	currentSize: DEFAULT_GRID_SIZE,
	matrixInTransition,
	matrixStatic: []
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
		case 'CHANGE_NEXT_GAME_SIZE':
			return {
				...state,
				nextGameSize: action.size
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

export default gridData;
