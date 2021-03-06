// *************************
// A global actions.js file.
// Action Creators are defined here.
// Action Creators are used mainly in Container Components to dispatch Redux actions.
// *************************

export const changeNextGameGridSize = (size) => ({ type: 'CHANGE_NEXT_GAME_SIZE', size });
export const goLeft = () => ({ type: 'GO_LEFT' });
export const goRight = () => ({ type: 'GO_RIGHT' });
export const goUp = () => ({ type: 'GO_UP' });
export const goDown = () => ({ type: 'GO_DOWN' });
export const undo = () => ({ type: 'UNDO' });
export const redo = () => ({ type: 'REDO' });
export const startNewGame = (gridSize, bestScore) => ({ type: 'START_NEW_GAME', gridSize, bestScore });
export const continuePlaying = () => ({ type: 'CONTINUE_PLAYING' });
