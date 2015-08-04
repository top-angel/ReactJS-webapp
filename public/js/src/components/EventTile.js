var React = require('react')
var EventDate = require('./EventDate')
var EventController = require('./EventController')

var EventTile = React.createClass({
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