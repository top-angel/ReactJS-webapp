var React = require('react');
var DetailView = require('./DetailView');

var ViewContainer = React.createClass({

	render: function() {
		return (
			<div>
				<FeaturedView />
			</div>
		);
	}

});

module.exports = ViewContainer;