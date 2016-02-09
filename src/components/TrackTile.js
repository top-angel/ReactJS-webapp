import React, {PropTypes} from 'react';
import Base from './Base';
import Icon from './FaIcon';

import { S3_ROOT_FOR_IMAGES } from '../constants/constants';
import { playSet, updatePlayCount } from '../services/playerService';
import history from '../services/history';

export default class TrackTile extends Base {
	constructor(props) {
		super(props);
		this.autoBind('openArtistPage', 'openFestivalPage', 'playSet', 'trackPlay');
	}
	openArtistPage(e) {
		e.stopPropagation();
		var routePath = this.props.artist.split(' ').join('_');
		history.pushState(null, `/artist/${routePath}`);
		mixpanel.track("Artist Clicked", {
			"Artist": this.props.artist
		});
	}
	openFestivalPage(e) {
		e.stopPropagation();
		if(this.props.isRadiomix == 0) {
			history.pushState(null, `/festival/${this.props.eventId}`);
		} else {
			history.pushState(null, `/mix/${this.props.eventId}`);
		}
	}
	playSet() {
		playSet(this.props.id, this.context.push, this.props.startTime);
		updatePlayCount(this.props.id, this.context.user.id);
		this.trackPlay();
	}
	trackPlay() {
		mixpanel.track("Track Played", {
			"Track Artist": this.props.artistName,
			"Track Name": this.props.trackName,
			"Set Artist": this.props.artist,
			"Event": this.props.event
		});
	}
	render() {
		var image = {
			backgroundImage: `url('${S3_ROOT_FOR_IMAGES+this.props.bannerImage}')`,
			backgroundSize: '100% 100%'
		};
		var time = `${this.props.startTime} | ${this.props.setLength}`;

		return (
			<div className='track-tile flex-column' style={image}>
			    <div className='track-info flex-row'>
			    	<img src={S3_ROOT_FOR_IMAGES+this.props.artistImage} />
			    	<header onClick={this.playSet}>
			    		<h5>{this.props.trackName}</h5>
			    		<p className='play'><Icon size={14}>play</Icon>{time}</p>
			    	</header>
			    </div>
			    <div className='set-info flex-column'>
					<p className='artist' onClick={this.openArtistPage}>{this.props.artist}</p>
					<p className='event' onClick={this.openFestivalPage}>{this.props.event}</p>
				</div>
			</div>
		);
	}
}

TrackTile.contextTypes = {
	push: React.PropTypes.func,
	user: React.PropTypes.object
};

TrackTile.propTypes = {
	songName: PropTypes.string,
	artistName: PropTypes.string,
	trackName: PropTypes.string,
	id: PropTypes.number,
	songUrl: PropTypes.string,
	startTime: PropTypes.string,
	setLength: PropTypes.string,
	event: PropTypes.string,
	artist: PropTypes.string,
	isRadiomix: PropTypes.number,
	eventId: PropTypes.number,
	bannerImage: PropTypes.string,
	artistImage: PropTypes.string
};