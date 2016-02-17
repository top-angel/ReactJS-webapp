import React from 'react';
import Base from './Base';
import { API_ROOT, S3_ROOT_FOR_IMAGES, DEFAULT_IMAGE } from '../constants/constants';
import history from '../services/history';
import {playSet, updatePlayCount} from '../services/playerService';

import SetShare from './SetShare';

export default class SetTile extends Base {
	constructor(props) {
		super(props);
		this.autoBind('openArtistPage', 'openFestivalPage', 'playSet');
	}
	openArtistPage() {
		var route = this.props.artist.split(' ').join('_');
		history.pushState(null, `/artist/${route}`);
		mixpanel.track("Artist Clicked", {
			"Artist": this.props.artist
		});
	}
	openFestivalPage() {
		if(this.props.isRadiomix) {
			history.pushState(null, `/mix/${this.props.eventId}`);
		} else {
			history.pushState(null, `/festival/${this.props.eventId}`);
		}
	}
	playSet() {
		playSet(this.props.id, this.context.push);
		updatePlayCount(this.props.id, this.context.user.id);
	}
	render() {
		var eventImage = {
			backgroundImage: `url(${S3_ROOT_FOR_IMAGES+this.props.bannerImage})`
		};

		return (
			<div className='set-tile flex-column' style={eventImage} >
				<div className='detail flex-column'>
					<img src={S3_ROOT_FOR_IMAGES+this.props.artistImage} onClick={this.openArtistPage} />

					<div className='set-info flex-column flex-fixed-2x'>
						<p className='set' onClick={this.openFestivalPage}>{this.props.setName}</p> 
						<p className='artist caption' onClick={this.openArtistPage}>{this.props.artist}</p>
						<SetShare 
							id={this.props.id} 
							favorited={this.props.favorited} />
					</div>

					<div className='horizontal-divider center'/>

					<div className='flex-row flex-fixed flex-row'>
						<div className='play flex-fixed' onClick={this.playSet}>
							<p>
								<i className='fa fa-play' />
								{this.props.popularity}
							</p>
						</div>

						<div className='vertical-divider'/>

						<div className='time flex-fixed flex-row'>
							<p>
								<i className='fa fa-clock-o' />
								{this.props.setLength}
							</p>
						</div>
					</div>

				</div>
			</div>
		);
	}
}

SetTile.contextTypes = {
	push: React.PropTypes.func,
	user: React.PropTypes.object,
	loginStatus: React.PropTypes.bool
};

SetTile.defaultProps = {
	favorited: false,
	artistImage: DEFAULT_IMAGE
};