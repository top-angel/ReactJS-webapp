import React from 'react';
import TrackTile from './TrackTile';

var TrackContainer = React.createClass({

	getDefaultProps() {
		return {
			containerClass: 'flex-row tile-container',
			tracks: []
		};
	},

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.tracks != this.props.tracks;
	},

	render() {
		var { tracks, push } = this.props;

		var tiles = tracks.map((track, index) => {
			var props = {
				songname: track.songname,
				artistname: track.artistname,
				trackname: track.trackname,
				id: track.id,
				songURL: track.songURL,
				starttime: track.starttime,
				set_length: track.set_length,
				event: track.event,
				artist: track.artist,
				is_radiomix: track.is_radiomix,
				event_id: track.event_id,
				banner_image: track.banner_image.imageURL,
				artist_image: track.artists[0].icon_image.imageURL_small,
				push: push,
				key: index
			};

			return <TrackTile {...props} />
		});

		return (
			<div className={this.props.containerClass}>
				{tiles}
			</div>
		);
	}

});

module.exports = TrackContainer;