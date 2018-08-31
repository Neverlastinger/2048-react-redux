import { connect } from 'react-redux';

import { getGridSize, isGameOver, getYouWin } from '../store/queries';

import Grid from '../components/Grid';

/**
 * Redux container for the grid.
 */
const GridContainer = connect(
    () => ({
        gridSize: getGridSize(),
		isGameOver: isGameOver(),
		youWin: getYouWin()
    })
)(Grid);

export default GridContainer;
