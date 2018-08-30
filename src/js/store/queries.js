// *************************
// A global queries.js file.
//
// It is based on the idea of selectors in Redux: https://egghead.io/lessons/javascript-redux-colocating-selectors-with-reducers
// However, I found out that spreading selectors across all reducers and the usage of fromRandomReducer.selector(...) to be quite complicated.
// To solve this problem, all selectors in the application can be found in this file.
//
// These selectors are usually used in the mapStateToDispatch function in Container Components.
// *************************

import store from './store';

export const getGridSize = () => store.getState().gridData.currentSize;
export const getNextGameGridSize = () => store.getState().gridData.nextGameSize;
export const getMatrixInTransition = () => store.getState().gridData.matrixInTransition;
export const getXDirection = () => store.getState().gridData.xDirection;
export const getYDirection = () => store.getState().gridData.yDirection;
export const getAppearingTile = () => store.getState().gridData.appearingTile;
