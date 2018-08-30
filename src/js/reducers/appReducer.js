import { combineReducers } from 'redux';

import gridData from './gridData';
import undoable from './undoable';
import nextGameGridSize from './nextGameGridSize';

/**
 * The main Redux Reducer for this application.
 */
const appReducer = combineReducers({
	gridData: undoable(gridData),
	nextGameGridSize
});

export default appReducer;
