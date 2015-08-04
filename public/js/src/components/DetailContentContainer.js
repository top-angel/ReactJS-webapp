var React = require('react');
var DetailNavContainer = require('./DetailNavContainer');

var DetailContentContainer = React.createClass({
	render: function() {
		var tiles = [];
		//if detailview == artist return set and event tiles
		//else return lineup browse tiles
		return (
			<div>
				<DetailNavContainer navTitles={this.props.navTitles} />
				<DetailContent content={this.props.content} />
				<div className="results-container flex-row flex" content={this.props.content}>
					{tiles}
				</div>
			</div>
		);
	}

});

module.exports = DetailContentContainer;