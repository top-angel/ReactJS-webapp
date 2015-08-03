var React = require('react')
var EventDate = require('./EventDate')
var EventController = require('./EventController')

var EventTile = React.createClass({
	getInitialState: function() {
		return {
			event: null
		}
	},
	//for testing
	getDefaultProps: function() {
		return {
			event: 'Coachella 2015',
			image: 'images/coachella.jpg',
			month: 'APR',
			day: '20',
			location: 'Indio, CA',
			ticketLink: null,
		};
	},
	render: function() {
		return (
			<div className="flex-column overlay-container event-tile">
			    <img className="event-image" src={this.props.event.main_imageURL} />
			    <div className="overlay"></div>
			    <EventDate event={this.props.event} />
			    <div className="divider"></div>
			    <EventController />
			</div>
		);
	}
})


module.exports = EventTile