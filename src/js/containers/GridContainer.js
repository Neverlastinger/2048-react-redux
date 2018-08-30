import { connect } from 'react-redux';

import { getGridSize, isGameOver } from '../store/queries';

import Grid from '../components/Grid';

/**
 * Redux container for the grid.
 */
const GridContainer = connect(
    () => ({
        gridSize: getGridSize(),
		isGameOver: isGameOver()
    })
)(Grid);

export default GridContainer;
