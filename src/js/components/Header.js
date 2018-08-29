import React from 'react';

const Header = ({ gridSize, increaseGridSize, decreaseGridSize }) => (

	<section className="header">
		<header>
			<h1>2048</h1>
			<span>Demo by Radoslav Popov</span>
		</header>
		<div className="indicators">
			<div>
				<span>Score</span>
				<span>0</span>
			</div>
			<div>
				<span>Best</span>
				<span>0</span>
			</div>
		</div>
		<div className="new-game">
			<span>New game</span>
			<span className="size">{gridSize}x{gridSize}</span>
			<span className="up" onClick={increaseGridSize}>^</span>
			<span className="down" onClick={decreaseGridSize}>^</span>
		</div>
	</section>
);

export default Header;
