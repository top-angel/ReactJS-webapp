import React from 'react';
import ArtistTile from './BrowseTile';

var ArtistTileContainer = React.createClass({

	render: function() {
		var artists = this.props.artists;
		var push = this.props.push;

		var tiles = artists.map(function(artist) {
			return(<ArtistTile data={artist} key={artist.id} push={push}/>);
			return(
				<ArtistTile key={artist.id} push={push}>
					{artist}
				</ArtistTile>
			);
		});

		return (
			<div className='results-container flex-row flex'>
				{tiles}
			</div>
		);
	}

});

module.exports = ArtistTileContainer;