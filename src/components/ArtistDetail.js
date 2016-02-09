import React, {PropTypes} from 'react';
import Loader from 'react-loader';
import {Link} from 'react-router';
import R from 'ramda';
import api from '../services/api';
import {DEFAULT_IMAGE} from '../constants/constants';

import Base from './Base';
import SetContainer from './SetContainer';
import EventContainer from './EventContainer';
import DetailImageContainer from './DetailImageContainer';
import LinkButtonContainer from './LinkButtonContainer';

export default class ArtistDetail extends Base {
	constructor(props) {
		super(props);
		this.autoBind('getArtist');
		this.state = {
			loaded: false,
			sets: [],
			upcomingEvents: [],
			artistImage: DEFAULT_IMAGE,
			fb_link: null,
			twitter_link: null,
			instagram_link: null,
			soundcloud_link: null,
			youtube_link: null
		};
		this.getArtist();
	}
	getArtist() {
		let artist = this.props.params.artist;
		let query = artist.split('_').join('%20');

		api.get(`artists/search/${query}`).then(payload => {
			let a = payload.artists_search;
			this.context.push({ currentPage: a.artist });

			this.setState({
				artist: a.artist,
				sets: a.sets,
				upcomingEvents: a.upcoming_events,
				artistImage: a.icon_image.imageURL,
				fb_link: a.fb_link,
				twitter_link: a.twitter_link,
				instagram_link: a.instagram_link,
				soundcloud_link: a.soundcloud_link,
				youtube_link: a.youtube_link,
				setCount: a.set_count,
				eventCount: a.event_count
			});
			return artist.artist
		}).then(artist => {
			this.setState({ loaded: true });
		});
	}
	render() {
		let setText = this.state.setCount != 1 ? 'sets' : 'set';
		let eventText = this.state.eventCount != 1 ? 'events' : 'event';
		let artistInfo = `${this.state.setCount} ${setText} | ${this.state.eventCount} ${eventText}`;

		let detailInfo = {
			sets: R.pluck('id', this.state.sets),
			title: this.state.artist,
			buttonText: 'Shuffle',
			imageURL: this.state.artistImage,
			info: artistInfo
		};

		let links = [
			{
				type: 'facebook',
				url: this.state.fb_link
			},
			{
				type: 'twitter',
				url: this.state.twitter_link
			},
			{
				type: 'instagram',
				url: this.state.instagram_link
			},
			{
				type: 'soundcloud',
				url: this.state.soundcloud_link
			},
			{
				type: 'youtube',
				url: this.state.youtube_link
			}
		];

		return (
			<Loader loaded={this.state.loaded}>
				<div id='detail' className='view detail-page'>
					<DetailImageContainer {...detailInfo} />
					<LinkButtonContainer links={links}/>
					<div className='divider'/>
					<div className='flex-row links-container'>
						<Link className='click flex-fixed flex-container'
							to={`/artist/${this.props.params.artist}`}
							onlyActiveOnIndex={true}
							activeClassName='active'>
							<div className='center'>SETS</div>
						</Link>
						<Link className='click flex-fixed flex-container'
							to={`/artist/${this.props.params.artist}/events`}
							activeClassName='active'>
							<div className='center'>EVENTS</div>
						</Link>
					</div>
					{
						React.cloneElement(this.props.children, {
							sets: this.state.sets,
							events: this.state.upcomingEvents
						})
					}
				</div>
			</Loader>
		);
	}
}

ArtistDetail.contextTypes = {
	push: PropTypes.func
};
