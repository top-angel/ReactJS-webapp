import React from 'react';
import Loader from 'react-loader';
import {Link} from 'react-router';
// import {API_ROOT} from '../constants/constants';
import api from '../services/api';

import SetContainer from './SetContainer';
import EventContainer from './EventContainer';

import DetailImageContainer from './DetailImageContainer';
import LinkButtonContainer from './LinkButtonContainer';

var ArtistDetail = React.createClass({
	contextTypes: {
		push: React.PropTypes.func
	},

	componentWillMount() {
		this.getArtistData();
	},

	getInitialState() {
		return {
			loaded: false
		};
	},

	getArtistData() {
		var push = this.context.push;
		var artist = this.props.params.artist;
		var query = artist.split('_').join('%20');

		api.get(`artists/search/${query}`).then(res => {
			push({
				type: 'SHALLOW_MERGE',
				data: {
					detailData: res.artists_search
				}
			})
		}).then(() => {
			this.setState({ loaded: true })
		})
	},

	render() {
		var {appState} = this.props;

		var artistData = appState.get('detailData');

		var setText = artistData.set_count != 1 ? 'sets' : 'set';
		var eventText = artistData.event_count != 1 ? 'events' : 'event';
		var artistInfo = `${artistData.set_count} ${setText} | ${artistData.event_count} ${eventText}`;

		var detailInfo = {
			sets: R.pluck('id', artistData.sets),
			title: artistData.artist,
			buttonText: 'Shuffle',
			imageURL: artistData.icon_image.imageURL,
			info: artistInfo
		};

		var links = [
			{
				type: 'facebook',
				url: artistData.fb_link
			},
			{
				type: 'twitter',
				url: artistData.twitter_link
			},
			{
				type: 'instagram',
				url: artistData.instagram_link
			},
			{
				type: 'soundcloud',
				url: artistData.soundcloud_link
			},
			{
				type: 'youtube',
				url: artistData.youtube_link
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
							sets: artistData.sets,
							events: artistData.upcoming_events
						})
					}
				</div>
			</Loader>
		);
	}

});

export default ArtistDetail;