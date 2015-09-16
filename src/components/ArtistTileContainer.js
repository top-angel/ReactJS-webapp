import React from 'react';
import ArtistTile from './ArtistTile';

var ArtistTileContainer = React.createClass({

	render: function() {
		var artists = this.props.artists;
		var push = this.props.push;

		var tiles = artists.map(function(artist) {
			var props = {
				artist: artist.artist,
				key: artist.id,
				push: push,
				imageURL: artist.imageURL
			};

			return <ArtistTile {...props} />;
		});

		return (
			<div className='results-container flex-row flex'>
				{tiles}
			</div>
		);
	}

});

module.exports = ArtistTileContainer;