import React, {PropTypes} from 'react';
import Base from './Base';
import Icon from './FaIcon';

import { S3_ROOT_FOR_IMAGES } from '../constants/constants';
import { playSet, updatePlayCount } from '../services/playerService';
import {trackTrackPlay} from '../services/mixpanelService';

export default class TrackTile extends Base {
	constructor(props) {
		super(props);
		this.autoBind('openArtistPage', 'openFestivalPage', 'playSet', 'trackPlay', 'renderArtists');
	}
	openArtistPage(e, artist) {
		e.stopPropagation();
		const artistRoute = artist.split(' ').join('_');
		this.context.router.push(`/artist/${artistRoute}`);
		mixpanel.track("Artist Clicked", {
			"Artist": this.props.artist
		});
	}
	openFestivalPage(e) {
		e.stopPropagation();
		if(this.props.isRadiomix == 0) {
			this.context.router.push(`/festival/${this.props.eventId}`);
		} else {
			this.context.router.push(`/mix/${this.props.eventId}`);
		}
	}
	playSet() {
		playSet(this.props.id, this.context.push, this.props.startTime);
		updatePlayCount(this.props.id, this.context.user.id);
		this.trackPlay();
	}
	trackPlay() {
		trackTrackPlay(
			this.props.artistName,
			this.props.trackName,
			this.props.artist,
			this.props.event
		);
	}
	renderArtists() {
		return this.props.artists.map((artist, index) => {
			if(index === this.props.artists.length - 1) {
				return <span key={index} onClick={e => this.openArtistPage(e, artist.artist)}>{artist.artist}</span>
			}
			return <span key={index} onClick={e => this.openArtistPage(e, artist.artist)}>{`${artist.artist}, `}</span>
		})
	}
	render() {
		var image = {
			backgroundImage: `url('${S3_ROOT_FOR_IMAGES+this.props.bannerImage}')`,
			backgroundSize: '100% 100%'
		};
		var time = `${this.props.startTime} | ${this.props.setLength}`;

		return (
			<div className='col-xs-6 col-sm-4 col-md-3 col-xl-2'>
				<div className='track-tile flex-column' style={image}>
				    <div className='track-info flex-row'>
				    	<img src={S3_ROOT_FOR_IMAGES+this.props.artistImage} />
				    	<header onClick={this.playSet}>
				    		<h5>{this.props.trackName}</h5>
				    		<p className='play'><Icon size={14}>play</Icon>{time}</p>
				    	</header>
				    </div>
				    <div className='set-info flex-column'>
						<p className='artist'>{this.renderArtists()}</p>
						<p className='event' onClick={this.openFestivalPage}>{this.props.event}</p>
					</div>
				</div>
			</div>
		);
	}
}

const {func, object, string, number} = PropTypes;

TrackTile.contextTypes = {
	push: func,
	user: object,
	router: object
};

TrackTile.propTypes = {
	songName: string,
	artistName: string,
	trackName: string,
	id: number,
	songUrl: string,
	startTime: string,
	setLength: string,
	event: string,
	artist: string,
	isRadiomix: number,
	eventId: number,
	bannerImage: string,
	artistImage: string
};