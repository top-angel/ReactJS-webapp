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

		var tiles = data.map(function(track, index) {
			var props = {
				songname: track.songname,
				artistname: track.artistname,
				id: track.id,
				starttime: track.starttime,
				event: track.event,
				artist: track.artist,
				is_radiomix: track.is_radiomix,
				event_id: track.event_id,
				main_eventimageURL: track.main_eventimageURL,
				artistimageURL: track.artistimageURL,
				push: push,
				key: index
			};

			return <TrackTile {...props} />
		});

		return (
			<div className={this.props.containerClass} id={this.props.containerId}>
				{tiles}
			</div>
		);
	}

});

module.exports = TrackContainer;