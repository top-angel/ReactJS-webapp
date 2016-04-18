import React, {PropTypes} from 'react';
import Loader from 'react-loader';
import R from 'ramda';
import api from '../services/api';
import {DEFAULT_IMAGE} from '../constants/constants';

import Base from './Base';
import DetailHeader from './DetailHeader';
// import SocialMediaLinks from './SocialMediaLinks';
import ShuffleButton from './ShuffleButton';
import Tabs from './Tabs';
import Tab from './Tab';

const tabStyle = {
	position: 'relative',
	top: 0
};

export default class ArtistDetail extends Base {
	constructor(props) {
		super(props);
		this.autoBind('getArtist');
		this.state = {
			loaded: false,
			sets: [],
			events: [],
			artistImage: DEFAULT_IMAGE,
			setCount: 0,
			eventCount: 0
		};
	}
	componentWillMount() {
		this.getArtist();
		this.context.push({ currentPage: 'Artists' });
	}
	getArtist() {
		let artist = this.props.params.artist;
		let query = artist.split('_').join('%20');

		api.get(`artists/search/${query}`).then(payload => {
			let a = payload.artists_search;
			// this.context.push({ currentPage: a.artist });

			this.setState({
				artist: a.artist,
				sets: a.sets,
				events: a.upcoming_events,
				artistImage: a.icon_image.imageURL,
				setCount: a.set_count,
				eventCount: a.event_count
			});
		}).then(() => {
			this.setState({ loaded: true });
		});
	}
	render() {
		const setText = this.state.setCount != 1 ? 'sets' : 'set';
		const eventText = this.state.eventCount != 1 ? 'events' : 'event';
		const artistInfo = `${this.state.setCount} ${setText} | ${this.state.eventCount} ${eventText}`;

		const setIds = R.pluck('id', this.state.sets);

		return (
			<Loader loaded={this.state.loaded}>
				<div className='detail-view'>
					<DetailHeader image={this.state.artistImage}>
						<h3>{this.state.artist}</h3>
						<h5>{artistInfo}</h5>
						<ShuffleButton setIds={setIds} />
					</DetailHeader>
					<Tabs type='detail' style={tabStyle}>
						<Tab to={`/artist/${this.props.params.artist}`}>SETS</Tab>
						<Tab to={`/artist/${this.props.params.artist}/events`}>EVENTS</Tab>
					</Tabs>
					{
						React.cloneElement(this.props.children, {
							sets: this.state.sets,
							events: this.state.events
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
