import React from 'react';
import ArtistTile from './ArtistTile';

var ArtistTileContainer = React.createClass({

	getDefaultProps() {
		return {
			artists: []
		};
	},

	render: function() {
		var artists = this.props.artists;
		var push = this.props.push;

		var tiles = artists.map(artist => {
			var props = {
				artist: artist.artist,
				key: artist.id,
				push: push,
				imageURL: artist.imageURL,
				set_count: artist.set_count,
				event_count: artist.event_count
			};

			return <ArtistTile {...props} />;
		});

		return (
			<div className='flex-row flex'>
				{tiles}
			</div>
		);
	}

});

module.exports = ArtistTileContainer;