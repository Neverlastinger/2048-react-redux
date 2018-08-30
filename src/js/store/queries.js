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

export const getGridSize = () => present().gridSize;
export const getNextGameGridSize = () => store.getState().nextGameGridSize;
export const getMatrixInTransition = () => present().matrixInTransition;
export const getXDirection = () => present().xDirection;
export const getYDirection = () => present().yDirection;
export const getAppearingTile = () => present().appearingTile;
export const isUndoRedo = () => store.getState().gridData.isUndoRedo;
export const isGameOver = () => present().isGameOver;
export const getScore = () => present().score;
export const getBestScore = () => present().bestScore;

const present = () => store.getState().gridData.present;
