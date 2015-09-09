import React from 'react';
import EventTile from './EventTile';

var EventContainer = React.createClass({

	getDefaultProps: function() {
		return {
			containerId: 'EventContainer',
			containerClass: 'flex-row tile-container',
			errorClass: 'flex-column flex error',
			id: null,
			events: []
		};
	},
	render: function() {
		var events = this.props.events;
		var push = this.props.push;

		if(events.length == 0) {
			var tiles = <p className={this.props.errorClass}>
								No Upcoming Events Found. <br/>
								Check back soon. We're Adding more every day!
							</p>
		} else {
			var tiles = events.map(function(event, index) {
				var props = {
					key: index,
					id: event.id,
					push: push,
					event: event.event,
					start_date: event.start_date,
					main_imageURL: event.main_imageURL,
					ticket_link: event.ticket_link,
					venue: event.venue
				};

				return <EventTile {...props} /> ;
			});
		}

		return (
			<div className={this.props.containerClass || this.props.errorClass} id={this.props.containerId}>
				{tiles}
			</div>
		);
	}

});

module.exports = EventContainer;