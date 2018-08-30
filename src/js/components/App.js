import React from 'react';

import HeaderContainer from '../containers/HeaderContainer';
import GridContainer from '../containers/GridContainer';

/**
 * Displays the main layout of the application. 
 */
const App = () => (
	<div className="app">
		<HeaderContainer />
		<GridContainer />
	</div>
);

export default App;
