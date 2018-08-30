import { DEFAULT_GRID_SIZE } from './gridData/default';

/**
 * Redux reducer that keeps track of the size of the board displayed on the next game button.
 *
 * @param  state: integer, the size of the grid
 * @param  action
 */
const nextGameGridSize = (state = DEFAULT_GRID_SIZE, action) => {

	switch (action.type) {
		case 'CHANGE_NEXT_GAME_SIZE':
			return action.size;
        default:
            return state;
    }
}

export default nextGameGridSize;
