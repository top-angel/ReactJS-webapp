var React = require('react');

var LandingEvents = React.createClass({

	render: function() {
		return (
			<div className="flex-column landing-view" id="landing-3">
                <div className="flex-column flex-3x image-container overlay-container">
                    <div className="overlay"></div>
                    <div className="header-medium wow bounceInLeft">Discover upcoming events near you.</div>
                </div>
                <div className="flex-column flex text-container">
                    <div className="buffer"></div>
                    <div className="wow fadeInUp">Our streamlined event discovery feature allows you to find local events, view lineups, and purchase tickets within the app.</div>
                    <div className="buffer"></div>
                    <div className="divider center wow zoomIn"></div>
                    <div className="buffer"></div>
                    <div className="wow fadeInUp">You can see whos playing around the world, or in your hometown.</div>
                    <div className="buffer"></div>
                </div>
            </div>
		);
	}

});

module.exports = LandingEvents;