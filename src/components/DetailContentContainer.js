var React = require('react');
var DetailNavContainer = require('./DetailNavContainer');
var SetTile = require('./SetTile');
var EventTile = require('./EventTile');
var BrowseTile = require('./BrowseTile');

var DetailContentContainer = React.createClass({
	render: function() {
		var tiles = []
		console.log(this.props.data)
		this.props.data.sets.map(function(set, index){
			tiles.push(<SetTile data={set} key={index} />)
		})
		// this.props.content.lineup.map(function(artist, index) {
		// 	tiles.push(<BrowseTile data={artist} key={index}/>)
		// })
		return (
			<div>
				<DetailNavContainer navTitles={this.props.navTitles} />
				<div className="results-container flex-row flex">
					{tiles}
				</div>
			</div>
		);
	}

});

module.exports = DetailContentContainer;