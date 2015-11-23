import React from 'react';
import constants from '../constants/constants';
import EventContainer from './EventContainer';

var ClosestEvents = React.createClass({

	getDefaultProps() {
		return {
			appState: {
				closestEvents: []
			}
		};
	},

	render() {
		var props = {
			closestEvents: this.props.appState.get('closestEvents'),
			containerClass: 'flex-row tile-container',
			push: this.props.push
		};

		return (
			<EventContainer {...props} />
		);
	}

});

module.exports = ClosestEvents;