import React from 'react';
import EventTile from './EventTile';

var EventContainer = React.createClass({

	getDefaultProps() {
		return {
			className: 'flex-row tile-container',
			errorClass: 'flex-column error',
			id: null,
			events: []
		};
	},

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.events != this.props.events;
	},

	render() {
		var {events, push} = this.props;

		if(events.length == 0) {
			var tiles = (
				<div className={this.props.errorClass}>
					<h2>No Upcoming Events Found.</h2>
					<h4>Check back soon. We're Adding more every day!</h4>
				</div>
			);
		} else {
			var tiles = events.map((event, index) => {
				var props = {
					key: index,
					id: event.id,
					push: push,
					event: event.event,
					start_date: event.start_date,
					banner_image: event.icon_image.imageURL,
					ticket_link: event.ticket_link,
					venue: event.venue.venue
				};

				return <EventTile {...props} />
			});
		}

		return (
			<div className={this.props.className || this.props.errorClass}>
				{tiles}
			</div>
		);
	}

});

export default EventContainer;