import React from 'react';
import TrackTile from './TrackTile';

var TrackContainer = React.createClass({

	displayName: 'TrackContainer',
	getDefaultProps: function() {
		return {
			containerId: 'TrackContainer',
			containerClass: 'flex-row tile-container',
			tracks: []
		};
	},
	render: function() {
		var data = this.props.tracks;
		var push = this.props.push;

		var tiles = data.map(function(set, index) {
			return(
				<TrackTile
					data={set}
					key={index}
					dataId={set.id}
					push={push} />
			);
		});

		return (
			<div className={this.props.containerClass} id={this.props.containerId}>
				{tiles}
			</div>
		);
	}

});

module.exports = TrackContainer;