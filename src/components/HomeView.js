import React from 'react';
import {State} from 'react-router';
import HomeSidebar from './HomeSidebar';
import HomeContainer from './HomeContainer';

import NewSets from './NewSets';
import NewEvents from './NewEvents';
import Favorites from './Favorites';

var HomeView = React.createClass({

	mixins: [State],
	render: function() {
		var data = this.props.appState.get('userData');
		var routes = this.getRoutes();
		debugger;

		return (
			<div id="home" className="view flex-row overlay-container">
				<HomeSidebar data={data}/>
			</div>
		);
	}

});

// <HomeContainer data={data}/>

module.exports = HomeView;