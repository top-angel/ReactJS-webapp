var React = require('react');

var DetailContent = React.createClass({

	render: function() {
		var tiles = []
		// if(true) {
		// 	this.props.content.sets.forEach(function(contentItem) {
		// 		tiles.push(<SetTile/>) // Set tiles
		// 	});
		// } else if(true) {
		// 	this.props.content.upcomingEvents.forEach(function(contentItem) {
		// 		tiles.push(<EventTile/>) // Event tiles
		// 	});
		// } else {
		// 	this.props.content.lineup.forEach(function(contentItem) {
		// 		tiles.push(<BrowseTile/>) // Browse tiles
		// 	});
		// }
		return (
			<div className="results-container flex-row flex">
				{tiles}
			</div>
		);
	}

});

module.exports = DetailContent;