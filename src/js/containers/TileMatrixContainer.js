import { connect } from 'react-redux';

import { getMatrixInTransition, getGridSize, getYDirection, getXDirection, getAppearingTile, isUndoRedo, isGameOver } from '../store/queries';
import { goLeft, goRight, goUp, goDown } from '../store/actions';
import TileMatrix from '../components/TileMatrix';

/**
 * Redux container for the tiles representing the game board.
 */
const TileMatrixContainer = connect(
    (ownProps) => ({
		matrixInTransition: getMatrixInTransition(),
		gridSize: getGridSize(),
		yDirection: getYDirection(),
		xDirection: getXDirection(),
		appearingTile: getAppearingTile(),
		isUndoRedo: isUndoRedo(),
		isGameOver: isGameOver()
    }),
    (dispatch) => ({
		onLeft: () => {
			dispatch(goLeft());
		},
		onRight: () => {
			dispatch(goRight())
		},
		onUp: () => {
			dispatch(goUp())
		},
		onDown: () => {
			dispatch(goDown())
		}
    })
)(TileMatrix);

export default TileMatrixContainer;
