var React = require('react')

var FeaturedResultsHeader = React.createClass({
	render: function() {
		return (
			<div className="flex-row featured-results-header">
                <div className="flex center">Upcoming Events</div>
                <div className="buffer-2x"></div>
                <div className="flex center flex-row">
                    <i className="flex fa fa-map-marker"></i>
                    <div className="flex user-location">Dania Beach, FL, USA</div>
                    <div className="flex change-location">Change</div>
                </div>
            </div>
		);
	}
});

module.exports = FeaturedResultsHeader