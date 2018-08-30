export const MAX_GRID_SIZE = 66;
export const MIN_GRID_SIZE = 2;

const GRID_SIZE_IN_PX = 500;
const GRID_OFFSET_START = 24;

export const getGridConfig = (gridSize) => {
	var offset = Math.max(2, GRID_OFFSET_START - gridSize * 2);
	var tileSize = (GRID_SIZE_IN_PX - offset) / gridSize - offset;
	var fontSize = Math.max(6, parseInt(tileSize / 2, 10));

	return { offset, tileSize, fontSize };
};

export const getTileSize = (gridSize) => (
	getGridConfig(gridSize).tileSize
);

export const getLeftStyleByIndex = (x, gridSize) => {
	var { offset, tileSize } = getGridConfig(gridSize);
	return tileSize * x + offset * (x + 1);
};

export const getTopStyleByIndex = (y, gridSize) => {
	var { offset, tileSize } = getGridConfig(gridSize);
	return tileSize * y + offset * (y + 1)
};

export const getTileFontSize = (gridSize) => (
	getGridConfig(gridSize).fontSize
);
