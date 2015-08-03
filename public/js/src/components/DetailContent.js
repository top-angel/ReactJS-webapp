var React = require('react');

var DetailContent = React.createClass({

	render: function() {
		return (
			<div className="results-container flex-row flex">
				{tiles}
			</div>
		);
	}

});

module.exports = DetailContent;