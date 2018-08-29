import React from 'react';
import { connect } from 'react-redux';

import { getNextGameGridSize } from '../store/queries';
import { changeNextGameGridSize } from '../store/actions';
import { MAX_GRID_SIZE, MIN_GRID_SIZE } from '../config/config';
import Header from '../components/Header';

/**
 * Redux container for the header.
 */
const HeaderContainer = connect(
    () => ({
        gridSize: getNextGameGridSize()
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
		}
    })
)(Header);

export default HeaderContainer;
