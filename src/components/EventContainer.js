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
				return(
					<EventTile
						data={event}
						dataId={event.id}
						key={index}
						push={push}	/>
					);
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