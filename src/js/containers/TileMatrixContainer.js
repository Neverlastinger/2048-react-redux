import { connect } from 'react-redux';

import { getMatrixInTransition, getGridSize, getYDirection, getXDirection, getAppearingTile, isUndoRedo, isGameOver, getYouWin } from '../store/queries';
import { goLeft, goRight, goUp, goDown } from '../store/actions';
import TileMatrix from '../components/TileMatrix';

/**
 * Redux container for the tiles representing the game board.
 */
const TileMatrixContainer = connect(
    () => ({
		matrixInTransition: getMatrixInTransition(),
		gridSize: getGridSize(),
		yDirection: getYDirection(),
		xDirection: getXDirection(),
		appearingTile: getAppearingTile(),
		isUndoRedo: isUndoRedo()
    }),
    (dispatch) => ({
		onLeft: () => {
			!getYouWin() && !isGameOver() && dispatch(goLeft());
		},
		onRight: () => {
			!getYouWin() && !isGameOver() && dispatch(goRight())
		},
		onUp: () => {
			!getYouWin() && !isGameOver() && dispatch(goUp())
		},
		onDown: () => {
			!getYouWin() && !isGameOver() && dispatch(goDown())
		}
    })
)(TileMatrix);

export default TileMatrixContainer;
