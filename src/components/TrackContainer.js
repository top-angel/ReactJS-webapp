import React from 'react';
import TrackTile from './TrackTile';

var TrackContainer = React.createClass({

	render: function() {
		var data = this.props.data;
		var tiles = data.map(function(set) {
			return(<TrackTile data={set}/>);
		});
		return (
			<div className={this.props.trackClass}>
				{tiles}
			</div>
		);
	}

});

module.exports = TrackContainer;