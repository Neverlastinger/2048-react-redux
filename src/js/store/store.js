// *************************
// This is where the global Redux Store lives.
// https://redux.js.org/docs/basics/Store.html
// *************************

import { createStore } from 'redux';
import appReducer from '../reducers/appReducer';

const store = createStore(
    appReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
