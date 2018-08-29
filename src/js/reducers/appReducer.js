import { combineReducers } from 'redux';

import gridData from './gridData';

/**
 * The main Redux Reducer for this application.
 */
const appReducer = combineReducers({
	gridData
});

export default appReducer;
