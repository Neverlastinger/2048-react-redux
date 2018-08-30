// *************************
// This is where the global Redux Store lives.
// https://redux.js.org/docs/basics/Store.html
// *************************

import { createStore } from 'redux';
import appReducer from '../reducers/appReducer';
import { saveState, loadState } from '../localStorage/localStorage';

const persistedState = loadState();

const store = createStore(
    appReducer,
	persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
	saveState(store.getState());
});

export default store;
