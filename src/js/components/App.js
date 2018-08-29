import React from 'react';

import HeaderContainer from '../containers/HeaderContainer';
import GridContainer from '../containers/GridContainer';

const App = () => (
	<div className="app">
		<HeaderContainer />
		<GridContainer />
	</div>
);

window.addEventListener('load', function() {
	console.log(1);
});

export default App;
