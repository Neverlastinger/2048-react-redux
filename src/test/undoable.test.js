import React from 'react';
import ReactDOM from 'react-dom';

import undoable from '../js/reducers/undoable';
import gridData from '../js/reducers/gridData';
import { goLeft, undo, redo } from '../js/store/actions';

it('has empty past and future in the beginning', () => {

	const undoableGridData = undoable(gridData)

	var defaultState = undoableGridData(undefined, {});

	expect(defaultState.past.length).toEqual(0);
	expect(defaultState.future.length).toEqual(0);
	expect(defaultState.present.matrixInTransition.length).toEqual(4);
});

it('generates the correct present state on undo and redo', () => {

	const undoableGridData = undoable(gridData);

	var initialState = undoableGridData(undefined, {});

	var presentState = undoableGridData(initialState, goLeft());
	var pastState = undoableGridData(presentState, undo());

	expect(initialState.present).toEqual(pastState.present);

	var redoedState = undoableGridData(pastState, redo());

	expect(presentState.present).toEqual(redoedState.present);
});
