import React from 'react';
import TrackTile from './TrackTile';

var TrackContainer = React.createClass({

	displayName: 'TrackContainer',
	render: function() {
		var data = this.props.tracks;
		var push = this.props.push;

		var tiles = data.map(function(set) {
			return(<TrackTile data={set} push={push}/>);
		});

		return (
			<div className={this.props.containerClass}>
				{tiles}
			</div>
		);
	}

});

module.exports = TrackContainer;