import { DEFAULT_GRID_SIZE } from './gridData/default';

const nextGameGridSize = (state = DEFAULT_GRID_SIZE, action) => {

	switch (action.type) {
		case 'CHANGE_NEXT_GAME_SIZE':
			return action.size;
        default:
            return state;
    }
}

export default nextGameGridSize;
