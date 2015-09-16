import React from 'react';
import constants from '../constants/constants';
import EventContainer from './EventContainer';

var UpcomingEvents = React.createClass({

	getInitialState: function() {
		return {
			loaded: false
		};
	},

	getDefaultProps: function() {
		return {
			appState: {
				soonestEvents: []
			}
		};
	},

	// componentWillMount: function() {
	// 	this.getUpcomingEvents();
	// },

	// getUpcomingEvents: function() {
	// 	var push = this.props.push;
	// 	var upcomingUrl = constants.API_ROOT + 'upcoming';
	// 	var _this = this;

	// 	$.ajax({
	// 		type: 'get',
	// 		url: upcomingUrl
	// 	})
	// 	.done(function(response) {
	// 		push({
	// 			type: 'SHALLOW_MERGE',
	// 			data: {
	// 				soonestEvents: response.payload.upcoming.soonestEvents
	// 			}
	// 		});

	// 		_this.setState({
	// 			loaded: true
	// 		});
	// 	});
	// },

	render: function() {
		var props = {
			push: this.props.push,
			events: this.props.appState.get('soonestEvents'),
			containerClass: 'flex-row tile-container'
		};

		return <EventContainer {...props} />
	}

});

module.exports = UpcomingEvents;