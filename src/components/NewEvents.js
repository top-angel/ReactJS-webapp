import React from 'react';
import constants from '../constants/constants';
import EventContainer from './EventContainer';

var NewEvents = React.createClass({

	componentWillMount: function() {
		this.getNewEvents();
	},
	getNewEvents: function() {
		var userId = this.props.appState.get('userId');
		var push = this.props.push;
		var results,
			newEventsUrl = constants.API_ROOT + 'user/stream/' + userId + '?filter=upcoming';

		$.ajax({
			url: newEventsUrl,
			type: 'get'
		})
		.done(function(response) {
			results = response.payload.user.stream;
			push({
				type: 'SHALLOW_MERGE',
				data: {
					newEvents: results
				}
			});
		});
	},
	render: function() {
		var newEvents = this.props.appState.get('newEvents');
		var containerClass = 'flex-row flex-fixed-3x results-container';
		var containerId = 'NewEvents';

		return (
			<EventContainer
				containerClass={containerClass}
				containerId={containerId}
				events={newEvents}/>
		);
	}

});

module.exports = NewEvents;