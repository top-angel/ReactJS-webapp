import React from 'react';
import {RouteHandler} from 'react-router';
import Loader from 'react-loader';

import FeaturedContainer from './FeaturedContainer';
import LocationModule from './LocationModule';
import EventContainer from './EventContainer';

var EventsView = React.createClass({
	
	displayName: 'EventsView',
	render: function() {
		var push = this.props.push;
		var appState = this.props.appState;
		var containerClass='flex-row flex results-container';

		return (
			<div id="EventsView" className="view flex-column">
				<FeaturedContainer 
					appState={appState}
					push={push} />
				<LocationModule
					push={push}
                	appState={appState} />
            	<RouteHandler appState={appState} push={push} containerClass={containerClass} />
          </div>
		);
	}
});

module.exports = EventsView