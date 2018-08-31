import { connect } from 'react-redux';

import { getNextGameGridSize, getScore, getBestScore } from '../store/queries';
import { changeNextGameGridSize, undo, redo, startNewGame } from '../store/actions';
import { MAX_GRID_SIZE, MIN_GRID_SIZE } from '../config/ui';
import Header from '../components/Header';

/**
 * Redux container for the header.
 */
const HeaderContainer = connect(
    () => ({
        gridSize: getNextGameGridSize(),
		score: getScore(),
		bestScore: getBestScore()
    }),
    (dispatch) => ({
		increaseGridSize: () => {
			if (getNextGameGridSize() < MAX_GRID_SIZE) {
            	dispatch(changeNextGameGridSize(getNextGameGridSize() + 1));
			}
        },
		decreaseGridSize: () => {
			if (getNextGameGridSize() > MIN_GRID_SIZE) {
				dispatch(changeNextGameGridSize(getNextGameGridSize() - 1));
			}
		},
		undo: () => {
			dispatch(undo());
		},
		redo: () => {
			dispatch(redo());
		},
		startNewGame: () => {
			dispatch(startNewGame(getNextGameGridSize(), getBestScore()));
		}
    })
)(Header);

export default HeaderContainer;
