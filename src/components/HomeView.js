var React = require('react');
var HomeSidebar = require('./HomeSidebar');
var HomeContainer = require('./HomeContainer');

var HomeView = React.createClass({

	render: function() {
		return (
			<div id="home" className="view flex-row overlay-container">
				<HomeSidebar />
				<HomeContainer />
			</div>
		);
	}

});

module.exports = HomeView;