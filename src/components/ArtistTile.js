import React from 'react';
import constants from '../constants/constants';
import {History} from 'react-router';

var ArtistTile = React.createClass({

	displayName: 'ArtistTile',
	mixins: [History],

	trackArtist() {
		mixpanel.track("Artist Clicked", {
			"Artist": this.props.artist
		});
	},

	openArtistPage() {
		var routePath = this.props.artist.split(' ').join('_');
		this.history.pushState(null, '/artist/' + routePath);
		this.trackArtist();
	},

	render() {
		var image = {
			backgroundImage: `url('${constants.S3_ROOT_FOR_IMAGES}small_${this.props.imageURL}')`
		};
		var setText = this.props.set_count > 1 ? 'sets' : 'set';
		var eventText = this.props.event_count != 1 ? 'events' : 'event';
		var artistInfo = `${this.props.set_count} ${setText} | ${this.props.event_count} ${eventText}`;

		// return (
		// 	<div className='artist-tile flex-column click'
		// 		style={image}
		// 		onClick={this.openArtistPage}
		// 	>
		// 		<div className='center'>{this.props.artist}</div>
		// 	</div>
		// );

		return (
			<div className='artist-tile flex-column' onClick={this.openArtistPage} >
				<img src={constants.S3_ROOT_FOR_IMAGES+this.props.imageURL} />
				<div className='center'>{this.props.artist}</div>
				<p>{artistInfo}</p>
			</div>
		);
	}
	
});

module.exports = ArtistTile;
