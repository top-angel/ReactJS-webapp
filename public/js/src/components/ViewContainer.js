var React = require('react');
var DetailView = require('./DetailView');

var ViewContainer = React.createClass({

	render: function() {
		return (
			<div>
				<DetailView detailData={this.props.data} />
			</div>
		);
	}

});

module.exports = ViewContainer;