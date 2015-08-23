var React = require('react');

var LandingHome = require('./LandingHome');
var LandingApp = require('./LandingApp');
var LandingEvents = require('./LandingEvents');

var LandingView = React.createClass({
  displayName: 'LandingView',
	render: function() {
		return (
			<div id="landing" className="flex-column view flex">
        <LandingHome />
        <LandingApp />
        <LandingEvents />
			</div>
		);
	}

});

module.exports = LandingView;
