import React from 'react';
import constants from '../constants/constants';
import EventContainer from './EventContainer';

var ClosestEvents = React.createClass({

	displayName: 'ClosestEvents',
	getDefaultProps: function() {
		return {
			appState: {
				closestEvents: []
			}
		};
	},
	render: function() {
		var closestEvents = this.props.appState.get('closestEvents');
		var containerClass = 'flex-row tile-container';
		var push = this.props.push;

		return (
			<EventContainer
				events={closestEvents}
				containerClass={containerClass}
				push={push} />
		);
	}

});

module.exports = ClosestEvents;