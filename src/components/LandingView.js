import React from 'react';
import LandingHome from './LandingHome';
import LandingApp from './LandingApp';
import LandingBeacon from './LandingBeacon';

var LandingView = React.createClass({
	render: function() {
		return (
			<div id="LandingView" className="flex-column view flex">
				<LandingHome />
				<LandingApp />
				<LandingBeacon />
			</div>
		);
	}

});

module.exports = LandingView;
