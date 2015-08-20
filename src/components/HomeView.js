var React = require('react');
var HomeSidebar = require('./HomeSidebar');
var HomeResultsContainer = require('./HomeResultsContainer');

var HomeView = React.createClass({

	render: function() {
		return (
			<div id="home" className="view flex-row overlay-container hidden">
				<HomeSidebar />
				<HomeResultsContainer />
			</div>
		);
	}

});

module.exports = HomeView;