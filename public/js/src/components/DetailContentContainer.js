var React = require('react');
var DetailNavContainer = require('./DetailNavContainer');
var DetailContent = require('./DetailContent');

var DetailContentContainer = React.createClass({

	render: function() {
		return (
			<div>
				<DetailNavContainer navTitles={this.props.navTitles} />
				<DetailContent content={this.props.content} />
			</div>
		);
	}

});

module.exports = DetailContentContainer;