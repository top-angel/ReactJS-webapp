import React, {PropTypes} from 'react';
import Base from './Base';
import { API_ROOT, S3_ROOT_FOR_IMAGES, DEFAULT_IMAGE } from '../constants/constants';
import {playSet, updatePlayCount} from '../services/playerService';
import {trackSetPlay} from '../services/mixpanelService';
import SetShare from './SetShare';

const {func, object, bool, number, string, array} = PropTypes;

const propTypes = {
	id: number,
	eventId: number,
	setName: string,
	event: string,
	isRadiomix: number,
	artists: array,
	popularity: number,
	songUrl: string,
	bannerImage: string,
	favorited: bool
};

const contextTypes = {
	push: func,
	user: object,
	loginStatus: bool,
	router: object
};

const defaultProps = {
	favorited: false,
	artistImage: DEFAULT_IMAGE
};

export default class SetTile extends Base {
	constructor(props) {
		super(props);
		this.autoBind('openArtistPage', 'openFestivalPage', 'playSet');
	}
	openArtistPage(artist) {
		let route = artist.split(' ').join('_');
		this.context.router.push(`/artist/${route}`);

		mixpanel.track("Artist Clicked", {
			"Artist": artist
		});
	}
	openFestivalPage() {
		if(this.props.isRadiomix) {
			this.context.router.push(`/mix/${this.props.eventId}`);
		} else {
			this.context.router.push(`/festival/${this.props.eventId}`);
		}
	}
	playSet() {
		playSet(this.props.id, this.context.push);
		updatePlayCount(this.props.id, this.context.user.id);
	}
	renderArtists() {
		return this.props.artists.map((artist, index) => {
			if(index === this.props.artists.length - 1) {
				return <span className='artist' key={index} onClick={() => this.openArtistPage(artist.artist)}>{artist.artist}</span>
			}
			return <span className='artist' key={index} onClick={() => this.openArtistPage(artist.artist)}>{`${artist.artist}, `}</span>
		})
	}
	render() {
		const artistImage = this.props.artists[0].icon_image.imageURL_small;
		const eventImage = {
			backgroundImage: `url(${S3_ROOT_FOR_IMAGES+this.props.bannerImage})`
		};

		return (
			<div className='col-xs-6 col-sm-4 col-xl-3'>
				<div className='set-tile flex-column' style={eventImage}>
					<div className='detail flex-column'>
						<img src={S3_ROOT_FOR_IMAGES+artistImage} />

						<div className='set-info flex-column flex-fixed-2x'>
							<p className='set' onClick={this.openFestivalPage}>{this.props.setName}</p> 
							<p className='caption'>
								{this.renderArtists()}
							</p>
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
			</div>
		);
	}
}

SetTile.contextTypes = contextTypes;
SetTile.defaultProps = defaultProps;