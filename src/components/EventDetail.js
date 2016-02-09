import React, {PropTypes} from 'react';
import R from 'ramda';
import api from '../services/api';
import {DEFAULT_IMAGE} from '../constants/constants';

import Base from './Base';
import Loader from 'react-loader';
import EventDetailHeader from './EventDetailHeader'
import ArtistTileContainer from './ArtistTileContainer';

export default class EventDetail extends Base {
	constructor(props) {
		super(props);
		this.autoBind('getEvent');
		this.state = {
			loaded: false,
			event: '',
			date: '',
			ticketLink: null,
			lineup: [],
			imageURL: DEFAULT_IMAGE
		};
		this.getEvent();
	}
	getEventData(event) {
		api.get(`events/id/${event}`).then(payload => {
			let e = payload.events_id;
			this.context.push({ currentPage: e.event });
			this.setState({
				event: e.event,
				date: e.formatted_date,
				ticketLink: e.ticket_link,
				imageURL: e.banner_image.imageURL,
				lineup: e.lineup
			});
		}).then(() => {
			this.setState({ loaded: true });
		});
	}
	render() {
		let header = {
			date: this.state.date,
			title: this.state.event,
			ticketLink: this.state.ticketLink,
			imageURL: this.state.imageURL
		};

		return (
			<Loader loaded={this.state.loaded}>
				<div id='detail' className='detail-page'>
					<EventDetailHeader {...header}/>
					<div className='flex-row links-container'>
						<div className='center flex-fixed'>
							LINEUP
						</div>
					</div>
					<ArtistTileContainer artists={this.state.lineup} />
				</div>
			</Loader>
		);
	}
}

EventDetail.contextTypes = {
	push: PropTypes.func
};