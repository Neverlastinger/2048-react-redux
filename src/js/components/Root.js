import React from 'react';
import { Provider } from 'react-redux';

import store from '../store/store';
import App from './App';

/**
 * Redux Root component. This is where application kicks in.
 */
const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

export default Root;
