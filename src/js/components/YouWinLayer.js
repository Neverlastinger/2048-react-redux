import React from 'react';

/**
 * Displays the You win overlay on top of the game grid.
 *
 * @param continuePlaying: called when the user clicks on the continue button
 */
const YouWinLayer = ({ continuePlaying }) => (
	<div className="overlay">
		<p>You win!</p>
		<div className="continue" onClick={continuePlaying}>Continue</div>
	</div>
);

export default YouWinLayer;
