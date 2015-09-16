import React from 'react';
import constants from '../constants/constants';
import {History} from 'react-router';

var ArtistTile = React.createClass({

	displayName: 'ArtistTile',
	mixins: [History],
	getDefaultProps: function() {
		return {
			artists: {
				imageURL: null
			}
		};
	},

	openArtistPage: function() {
		var routePath = this.props.artist.split(' ').join('-');
		this.history.pushState(null, '/artist/' + routePath);
	},

	render: function() {
		var image = {
			backgroundImage: "url('"+constants.S3_ROOT_FOR_IMAGES +this.props.imageURL+"')"
		};

		return (
			<div className='artist-tile flex-column click'
				style={image}
				onClick={this.openArtistPage}
			>
				<div className='center'>{this.props.artist}</div>
			</div>
		);
	}
	
});

module.exports = ArtistTile;
