import React from 'react';
import { connect } from 'react-redux';

import { getMatrixInTransition, getGridSize } from '../store/queries';

import Game from '../components/Game';

/**
 * Redux container for the tiles representing the game.
 */
const GameContainer = connect(
    (ownProps) => ({
		matrixInTransition: getMatrixInTransition(),
		gridSize: getGridSize()
    }),
    (dispatch) => ({

    })
)(Game);

export default GameContainer;
