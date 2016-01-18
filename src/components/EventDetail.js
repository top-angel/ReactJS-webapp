import React from 'react';
import R from 'ramda';
import api from '../services/api';
import {DEFAULT_IMAGE} from '../constants/constants';


import Loader from 'react-loader';
import EventDetailHeader from './EventDetailHeader'
import ArtistTileContainer from './ArtistTileContainer';

var EventDetail = React.createClass({
	getInitialState() {
		return {
			loaded: false,
			event: '',
			date: '',
			ticketLink: null,
			lineup: [],
			imageURL: DEFAULT_IMAGE
		};
	},

	componentWillMount() {
		this.getEventData(this.props.params.event);
	},

	getEventData(event) {
		api.get(`events/id/${event}`).then(res => {
			var e = res.events_id
			this.setState({
				event: e.event,
				date: e.formatted_date,
				ticketLink: e.ticket_link,
				imageURL: e.banner_image.imageURL,
				lineup: e.lineup
			})
		}).then(() => {
			this.setState({ loaded: true })
		})
	},
	render() {
		var header = {
			date: this.state.date,
			title: this.state.event,
			ticketLink: this.state.ticket_link,
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

});

export default EventDetail;