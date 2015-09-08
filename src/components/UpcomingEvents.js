import React from 'react';
import Loader from 'react-loader';
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
	// componentDidMount: function() {
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
		var push = this.props.push;
		var soonestEvents = this.props.appState.get('soonestEvents');
		var containerClass = 'flex flex-row results-container';

		return (
				<EventContainer
					events={soonestEvents}
					containerClass={containerClass}
					push={push} />
		);
	}

});

module.exports = UpcomingEvents;