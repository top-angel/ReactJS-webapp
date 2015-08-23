var React = require('react')

var FeaturedResultsHeader = React.createClass({
    getInitialState: function() {
        return {
            location: 'Dania Beach, FL, USA' 
        };
    },
    getNewLocation: function() {
        var newLocation = prompt('Enter your location: ');
        this.setState({
            location: newLocation 
        });
    },
	render: function() {
		return (
			<div className="flex-row featured-results-header">
                <div className="flex center">Upcoming Events</div>
                <div className="buffer-2x"></div>
                <div className="flex center flex-row">
                    <i className="flex fa fa-map-marker"></i>
                    <div className="flex user-location">{this.state.location}</div>
                    <div className="flex change-location" onClick={this.getNewLocation}>Change</div>
                </div>
            </div>
		);
	}
});

module.exports = FeaturedResultsHeader