import React from 'react';
import EventTile from './EventTile';

const EventContainer = React.createClass({

	checkIfEmpty(events) {
		if(events.length == 0) {
			return (
				<div className='flex-column error'>
					<h2>No Upcoming Events Found.</h2>
					<h4>Check back soon. We're Adding more every day!</h4>
				</div>
			)
		}
	},

	getDefaultProps() {
		return {
			className: 'flex-row tile-container',
			events: []
		};
	},

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.events != this.props.events;
	},

	render() {
		// var {events, push} = this.props;
		var events = this.props.events

		if(events.length == 0) {
			var tiles = (
				<div className='flex-column error'>
					<h2>No Upcoming Events Found.</h2>
					<h4>Check back soon. We're Adding more every day!</h4>
				</div>
			);
		} else {
			var tiles = events.map((event, index) => {
				return React.createElement(EventTile, {
					key: index,
					id: event.id,
					event: event.event,
					start_date: event.start_date,
					banner_image: event.banner_image.imageURL,
					ticket_link: event.ticket_link,
					venue: event.venue.venue
				});
			});
		}

		return (
			<div className={this.props.className}>
				{tiles}
			</div>
		);
	}

});

export default EventContainer;