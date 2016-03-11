import React, {PropTypes, Component} from 'react';
import EventTile from './EventTile';

const error = (
	<div className='flex-column error'>
		<h5>No Upcoming Events Found.</h5>
		<p>Check back soon. We're Adding more every day!</p>
	</div>
);

export default class EventContainer extends Component {
	constructor(props) {
		super(props);
	}
	shouldComponentUpdate(nextProps) {
		return nextProps.events != this.props.events;
	}
	render() {
		const tiles = this.props.events.map((event, index) => {
			return React.createElement(EventTile, {
				test: event,
				key: index,
				id: event.id,
				event: event.event,
				startDate: event.start_date,
				bannerImage: event.banner_image.imageURL,
				ticketLink: event.ticket_link,
				venue: event.venue.venue,
				address: event.venue.address
			});
		});

		return (
			<div className='tile-container'>
				{this.props.events.length == 0 ? error : tiles}
			</div>
		);
	}
}

EventContainer.propTypes = {
	events: PropTypes.array.isRequired
};