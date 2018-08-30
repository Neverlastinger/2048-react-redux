import { connect } from 'react-redux';

import { getGridSize } from '../store/queries';

import Grid from '../components/Grid';

/**
 * Redux container for the grid.
 */
const GridContainer = connect(
    () => ({
        gridSize: getGridSize()
    }),
    (dispatch) => ({

    })
)(Grid);

export default GridContainer;
