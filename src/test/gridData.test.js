import React from 'react';
import ReactDOM from 'react-dom';

import gridData from '../js/reducers/gridData';
import { goLeft, goRight, goUp, goDown } from '../js/store/actions';

it('calculates a correct default matrix size', () => {

	var defaultState = gridData(undefined, {});

	expect(defaultState.matrixInTransition.length).toEqual(4);
	expect(defaultState.matrixInTransition[0].length).toEqual(4);
});

it('generates two random default numbers', () => {

	var defaultState = gridData(undefined, {});
	var tileList = [];

	defaultState.matrixInTransition.forEach((row) => {
		row.forEach((tile) => {
			if (tile !== null) {
				tileList.push(tile);
			}
		})
	})

	expect(tileList.length).toEqual(2);
});

it('moves left with correct steps', () => {

	const initialState = {
		matrixStatic: [
			[ null, null, { value: 2 } ],
			[ null, { value: 4 }, null ],
			[ null, null, null ]
		]
	};

	var state = gridData(initialState, goLeft());

	expect(state.matrixInTransition[0][0]).toEqual(null);
	expect(state.matrixInTransition[0][1]).toEqual(null);
	expect(state.matrixInTransition[1][0]).toEqual(null);
	expect(state.matrixInTransition[1][2]).toEqual(null);

	expect(state.matrixInTransition[0][2].value).toEqual(2);
	expect(state.matrixInTransition[0][2].steps).toEqual(2);

	expect(state.matrixInTransition[1][1].value).toEqual(4);
	expect(state.matrixInTransition[1][1].steps).toEqual(1);

	expectEmptyOrAppearing(state.matrixStatic[0][1]);
	expectEmptyOrAppearing(state.matrixStatic[0][2]);
	expectEmptyOrAppearing(state.matrixStatic[1][1]);
	expectEmptyOrAppearing(state.matrixStatic[1][2]);

	expect(state.matrixStatic[0][0].value).toEqual(2);
	expect(state.matrixStatic[1][0].value).toEqual(4);
});

it('moves right with correct steps', () => {

	const initialState = {
		matrixStatic: [
			[ null, null, { value: 2 } ],
			[ null, { value: 4 }, null ],
			[ null, null, null ]
		]
	};

	var state = gridData(initialState, goRight());

	expect(state.matrixInTransition[0][0]).toEqual(null);
	expect(state.matrixInTransition[0][1]).toEqual(null);
	expect(state.matrixInTransition[1][0]).toEqual(null);
	expect(state.matrixInTransition[1][0]).toEqual(null);

	expect(state.matrixInTransition[0][2].value).toEqual(2);

	expect(state.matrixInTransition[1][1].value).toEqual(4);
	expect(state.matrixInTransition[1][1].steps).toEqual(1);

	expectEmptyOrAppearing(state.matrixStatic[0][0]);
	expectEmptyOrAppearing(state.matrixStatic[0][1]);
	expectEmptyOrAppearing(state.matrixStatic[1][0]);
	expectEmptyOrAppearing(state.matrixStatic[1][1]);

	expect(state.matrixStatic[0][2].value).toEqual(2);
	expect(state.matrixStatic[1][2].value).toEqual(4);
});

it('moves up with correct steps', () => {

	const initialState = {
		matrixStatic: [
			[ null, null, { value: 2 } ],
			[ null, null, null ],
			[ null, { value: 4 }, null ]
		]
	};

	var state = gridData(initialState, goUp());

	expect(state.matrixInTransition[0][0]).toEqual(null);
	expect(state.matrixInTransition[0][1]).toEqual(null);
	expect(state.matrixInTransition[1][0]).toEqual(null);
	expect(state.matrixInTransition[1][1]).toEqual(null);
	expect(state.matrixInTransition[1][2]).toEqual(null);
	expect(state.matrixInTransition[2][0]).toEqual(null);
	expect(state.matrixInTransition[2][2]).toEqual(null);

	expect(state.matrixInTransition[0][2].value).toEqual(2);
	expect(state.matrixInTransition[2][1].value).toEqual(4);

	expect(state.matrixInTransition[2][1].steps).toEqual(2);

	expectEmptyOrAppearing(state.matrixStatic[0][0]);
	expectEmptyOrAppearing(state.matrixStatic[1][0]);
	expectEmptyOrAppearing(state.matrixStatic[1][1]);
	expectEmptyOrAppearing(state.matrixStatic[1][2]);
	expectEmptyOrAppearing(state.matrixStatic[2][0]);
	expectEmptyOrAppearing(state.matrixStatic[2][1]);
	expectEmptyOrAppearing(state.matrixStatic[2][2]);

	expect(state.matrixStatic[0][1].value).toEqual(4);
	expect(state.matrixStatic[0][2].value).toEqual(2);
});

it('moves down with correct steps', () => {

	const initialState = {
		matrixStatic: [
			[ null, null, { value: 2 } ],
			[ null, { value: 4 }, null ],
			[ null, null, null ]
		]
	};

	var state = gridData(initialState, goDown());

	expect(state.matrixInTransition[0][0]).toEqual(null);
	expect(state.matrixInTransition[0][1]).toEqual(null);
	expect(state.matrixInTransition[1][0]).toEqual(null);
	expect(state.matrixInTransition[1][2]).toEqual(null);
	expect(state.matrixInTransition[2][0]).toEqual(null);
	expect(state.matrixInTransition[2][1]).toEqual(null);
	expect(state.matrixInTransition[2][2]).toEqual(null);

	expect(state.matrixInTransition[0][2].value).toEqual(2);
	expect(state.matrixInTransition[1][1].value).toEqual(4);

	expect(state.matrixInTransition[0][2].steps).toEqual(2);
	expect(state.matrixInTransition[1][1].steps).toEqual(1);

	expectEmptyOrAppearing(state.matrixStatic[0][0]);
	expectEmptyOrAppearing(state.matrixStatic[1][0]);
	expectEmptyOrAppearing(state.matrixStatic[2][0]);
	expectEmptyOrAppearing(state.matrixStatic[1][0]);
	expectEmptyOrAppearing(state.matrixStatic[1][1]);
	expectEmptyOrAppearing(state.matrixStatic[1][2]);
	expectEmptyOrAppearing(state.matrixStatic[2][0]);

	expect(state.matrixStatic[2][1].value).toEqual(4);
	expect(state.matrixStatic[2][2].value).toEqual(2);
});

it('merges tiles correctly when moving to the left', () => {

	const initialState = {
		matrixStatic: [
			[ { value: 2 }, null, { value: 2 } ],
			[ null, { value: 16 }, { value: 16 } ],
			[ null, null, null ]
		]
	};

	var state = gridData(initialState, goLeft());

	expect(state.matrixInTransition[0][0].increment).toEqual(true);
	expect(state.matrixInTransition[0][1]).toEqual(null);
	expect(state.matrixInTransition[0][2].destroy).toEqual(true);
	expect(state.matrixInTransition[0][2].steps).toEqual(2);
	expect(state.matrixInTransition[1][1].increment).toEqual(true);
	expect(state.matrixInTransition[1][2].destroy).toEqual(true);
	expect(state.matrixInTransition[1][2].steps).toEqual(2);

	expectEmptyOrAppearing(state.matrixStatic[0][1]);
	expectEmptyOrAppearing(state.matrixStatic[0][2]);
	expectEmptyOrAppearing(state.matrixStatic[1][1]);
	expectEmptyOrAppearing(state.matrixStatic[1][2]);

	expect(state.matrixStatic[0][0].value).toEqual(4);
	expect(state.matrixStatic[1][0].value).toEqual(32);
});

it('merges tiles correctly when moving to the right', () => {

	const initialState = {
		matrixStatic: [
			[ { value: 2 }, null, { value: 2 } ],
			[ null, { value: 16 }, { value: 16 } ],
			[ null, null, null ]
		]
	};

	var state = gridData(initialState, goRight());

	expect(state.matrixInTransition[0][0].destroy).toEqual(true);
	expect(state.matrixInTransition[0][0].steps).toEqual(2);
	expect(state.matrixInTransition[0][1]).toEqual(null);
	expect(state.matrixInTransition[0][2].increment).toEqual(true);
	expect(state.matrixInTransition[1][1].destroy).toEqual(true);
	expect(state.matrixInTransition[1][1].steps).toEqual(1);
	expect(state.matrixInTransition[1][2].increment).toEqual(true);

	expectEmptyOrAppearing(state.matrixStatic[0][0]);
	expectEmptyOrAppearing(state.matrixStatic[0][1]);
	expectEmptyOrAppearing(state.matrixStatic[1][0]);
	expectEmptyOrAppearing(state.matrixStatic[1][1]);

	expect(state.matrixStatic[0][2].value).toEqual(4);
	expect(state.matrixStatic[1][2].value).toEqual(32);
});

it('merges tiles correctly when moving up', () => {

	const initialState = {
		matrixStatic: [
			[ { value: 2 }, null, null ],
			[ null, { value: 16 }, null ],
			[ { value: 2 }, { value: 16 }, null ]
		]
	};

	var state = gridData(initialState, goUp());

	expect(state.matrixInTransition[0][0].increment).toEqual(true);
	expect(state.matrixInTransition[1][1].increment).toEqual(true);
	expect(state.matrixInTransition[1][1].steps).toEqual(1);
	expect(state.matrixInTransition[2][0].destroy).toEqual(true);
	expect(state.matrixInTransition[2][0].steps).toEqual(2);
	expect(state.matrixInTransition[2][1].destroy).toEqual(true);
	expect(state.matrixInTransition[2][1].steps).toEqual(2);

	expectEmptyOrAppearing(state.matrixStatic[0][2]);
	expectEmptyOrAppearing(state.matrixStatic[1][0]);
	expectEmptyOrAppearing(state.matrixStatic[1][1]);
	expectEmptyOrAppearing(state.matrixStatic[1][2]);
	expectEmptyOrAppearing(state.matrixStatic[2][0]);
	expectEmptyOrAppearing(state.matrixStatic[2][1]);
	expectEmptyOrAppearing(state.matrixStatic[2][2]);

	expect(state.matrixStatic[0][0].value).toEqual(4);
	expect(state.matrixStatic[0][1].value).toEqual(32);
});

it('merges tiles correctly when moving down', () => {

	const initialState = {
		matrixStatic: [
			[ { value: 2 }, null, null ],
			[ null, { value: 16 }, null ],
			[ { value: 2 }, { value: 16 }, null ]
		]
	};

	var state = gridData(initialState, goDown());

	expect(state.matrixInTransition[0][0].destroy).toEqual(true);
	expect(state.matrixInTransition[0][0].steps).toEqual(2);
	expect(state.matrixInTransition[1][1].destroy).toEqual(true);
	expect(state.matrixInTransition[1][1].steps).toEqual(1);
	expect(state.matrixInTransition[2][0].increment).toEqual(true);
	expect(state.matrixInTransition[2][1].increment).toEqual(true);

	expectEmptyOrAppearing(state.matrixStatic[0][0]);
	expectEmptyOrAppearing(state.matrixStatic[0][1]);
	expectEmptyOrAppearing(state.matrixStatic[0][2]);
	expectEmptyOrAppearing(state.matrixStatic[1][0]);
	expectEmptyOrAppearing(state.matrixStatic[1][1]);
	expectEmptyOrAppearing(state.matrixStatic[1][2]);
	expectEmptyOrAppearing(state.matrixStatic[2][2]);

	expect(state.matrixStatic[2][0].value).toEqual(4);
	expect(state.matrixStatic[2][1].value).toEqual(32);
});

it('doesnt win if 2048 is not there', () => {

	const initialState = {
		matrixStatic: [
			[ { value: 2 }, null, { value: 2 } ],
			[ null, { value: 16 }, { value: 16 } ],
			[ null, null, null ]
		]
	};

	var state = gridData(initialState, goLeft());

	expect(state.youWin).toEqual(false);
});

it('wins if 2048 is there', () => {

	const initialState = {
		matrixStatic: [
			[ { value: 2 }, null, { value: 2 } ],
			[ null, { value: 1024 }, { value: 1024 } ],
			[ null, null, null ]
		]
	};

	var state = gridData(initialState, goLeft());

	expect(state.youWin).toEqual(true);
});

it('loses if there are no legal moves', () => {

	const initialState = {
		matrixStatic: [
			[ { value: 2 }, { value: 4 }, { value: 8 } ],
			[ { value: 16 }, { value: 32 }, { value: 64 } ],
			[ { value: 128 }, { value: 256 }, null ]
		]
	};

	var state = gridData(initialState, goRight());

	expect(state.isGameOver).toEqual(true);
});

const isEmptyOrAppearing = (tile) => ( tile === null || tile.appearing === true );
const expectEmptyOrAppearing = (tile) => { expect(isEmptyOrAppearing(tile)).toBe(true); }
