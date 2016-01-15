import React from 'react';
import { API_ROOT, S3_ROOT_FOR_IMAGES } from '../constants/constants';
import history from '../services/history'
import {playSet, updatePlayCount} from '../services/playerService';
import SetShare from './SetShare';

var SetTile = React.createClass({
	displayName: 'SetTile',

	contextTypes: {
		push: React.PropTypes.func,
		user: React.PropTypes.object,
		loginStatus: React.PropTypes.bool
	},

	getDefaultProps() {
		return {
			favorited: false
		};
	},

	openArtistPage() {
		var routePath = this.props.artist.split(' ').join('_');
		history.pushState(null, `/artist/${routePath}`);
		mixpanel.track("Artist Clicked", {
			"Artist": this.props.artist
		});
	},

	openFestivalPage() {
		if(this.props.isRadiomix) {
			history.pushState(null, `/mix/${this.props.eventId}`);
		} else {
			history.pushState(null, `/festival/${this.props.eventId}`);
		}
	},

	playSet() {	
		playSet(this.props.id, this.context.push)
		updatePlayCount(this.props.id, this.context.user.id)
	},

	render() {
		var eventImage = {
			backgroundImage: `url(${S3_ROOT_FOR_IMAGES+this.props.bannerImage})`
		};

		return (
			<div className='flex-column set-tile' style={eventImage}>
				<div className='detail flex-column'>
					<div className='flex-row flex-fixed-2x'>
						<img 
							src={S3_ROOT_FOR_IMAGES+this.props.artistImage} 
							className='click' 
							onClick={this.openArtistPage} />
						<div className='flex-column flex'>
							<div className='flex click link set-name' onClick={this.openFestivalPage}>{this.props.setName}</div>
							<div className='flex click link artist' onClick={this.openArtistPage}>{this.props.artist}</div>
							<SetShare 
								id={this.props.id} 
								favorited={this.props.favorited} />
						</div>
					</div>
					<div className='divider center'/>
					<div className='flex-row flex-fixed'>
						<div className='flex-fixed click flex-container play'
							onClick={this.playSet}>
							<i className='fa fa-play center'>{'  '+this.props.popularity}</i>
						</div>
						<div className='divider'/>
						<div className='flex-fixed flex-container'>
							<i className='fa fa-clock-o center'>{'  '+this.props.setLength}</i>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

export default SetTile;