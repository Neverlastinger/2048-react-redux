import React from 'react';
import ReactDOM from 'react-dom';

import nextGameGridSize from '../js/reducers/nextGameGridSize';
import { changeNextGameGridSize } from '../js/store/actions';

it('changes the grid size correctly', () => {

	var defaultState = nextGameGridSize(undefined, {});
	expect(nextGameGridSize(defaultState, changeNextGameGridSize(5))).toEqual(5);
});
