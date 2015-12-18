import React from 'react';
import {S3_ROOT_FOR_IMAGES} from '../constants/constants';
import history from '../services/history'

var ArtistTile = React.createClass({

	trackArtist() {
		mixpanel.track("Artist Clicked", {
			"Artist": this.props.artist
		});
	},

	openArtistPage() {
		var routePath = this.props.artist.split(' ').join('_');
		history.pushState(null, `/artist/${routePath}`);
		this.trackArtist();
	},

	render() {
		var image = {
			backgroundImage: `url('${S3_ROOT_FOR_IMAGES+this.props.imageURL}')`
		};
		var setText = this.props.set_count > 1 ? 'sets' : 'set';
		var eventText = this.props.event_count != 1 ? 'events' : 'event';
		var artistInfo = `${this.props.set_count} ${setText} | ${this.props.event_count} ${eventText}`;

		return (
			<div className='artist-tile flex-column' onClick={this.openArtistPage} >
				<img src={S3_ROOT_FOR_IMAGES+this.props.imageURL} />
				<div className='center'>{this.props.artist}</div>
				<p>{artistInfo}</p>
			</div>
		);
	}
	
});

export default ArtistTile;
