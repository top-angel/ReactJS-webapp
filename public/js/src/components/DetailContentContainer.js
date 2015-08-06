var React = require('react');
var DetailNavContainer = require('./DetailNavContainer');
var SetTile = require('./SetTile');
var EventTile = require('./EventTile');

var DetailContentContainer = React.createClass({
	render: function() {
		var tiles = [];
		this.props.content.sets.map(function(set){
			tiles.push(<SetTile data={set}/>)
		});
		//TODO upcoming events
		return (
			<div>
				<DetailNavContainer navTitles={this.props.navTitles} />
				<div className="results-container flex-row flex" content={this.props.content}>
					{tiles}
				</div>
			</div>
		);
	}

});

module.exports = DetailContentContainer;