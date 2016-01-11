import React from 'react';
import ArtistTile from './ArtistTile';

var ArtistTileContainer = React.createClass({

	getDefaultProps() {
		return {
			artists: []
		};
	},

	render: function() {
		var tiles = this.props.artists.map(artist => {
			return React.createElement(ArtistTile, {
				artist: artist.artist,
				key: artist.id,
				imageURL: artist.imageURL,
				set_count: artist.set_count,
				event_count: artist.event_count
			})
		});

		return (
			<div className='flex-row flex'>
				{tiles}
			</div>
		);
	}

});

export default ArtistTileContainer;