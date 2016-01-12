import React from 'react';
import TrackTile from './TrackTile';

var TrackContainer = React.createClass({

	getDefaultProps() {
		return {
			className: 'flex-row tile-container',
			tracks: []
		};
	},

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.tracks != this.props.tracks;
	},

	render() {
		var { tracks, push } = this.props;
		var tiles = tracks.map((track, index) => {
			return React.createElement(TrackTile, {
				key: index,
				songname: track.song_name,
				artistname: track.artist_name,
				trackname: track.track_name,
				id: track.id,
				songURL: track.songURL,
				starttime: track.starttime,
				set_length: track.set_length,
				event: track.event.event,
				artist: track.artists[0].artist,
				is_radiomix: track.is_radiomix,
				event_id: track.event_id,
				banner_image: track.event.banner_image.imageURL,
				artist_image: track.artists[0].icon_image.imageURL_small
			})
		});

		return (
			<div className={this.props.className}>
				{tiles}
			</div>
		);
	}

});

export default TrackContainer;