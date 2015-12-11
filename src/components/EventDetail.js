import React from 'react';
import R from 'ramda';
import {API_ROOT} from '../constants/constants';

import Loader from 'react-loader';
import EventDetailHeader from './EventDetailHeader'
import ArtistTileContainer from './ArtistTileContainer';

var EventDetail = React.createClass({

	getInitialState() {
		return {
			loaded: false
		};
	},

	componentWillMount() {
		this.getEventData();
	},

	getEventData() {
		var push = this.props.push;
		var event = this.props.params.event;

		$.ajax({
			url: `${API_ROOT}events/id/${event}`,
			type: 'get',
		})
		.done(res => {
			if(res.status === 'success') {
				push({
					type: 'SHALLOW_MERGE',
					data: {
						detailData: res.payload.events_id
					}
				});

				this.setState({
					loaded: true
				});
			}
		});
	},
	render() {
		var appState = this.props.appState;
		var detailData = appState.get('detailData');

		var detailInfo = {
			date: detailData.formatted_date,
			title: detailData.event,
			ticketLink: detailData.ticket_link,
			imageURL: detailData.banner_image.imageURL
		};

		var lineup = {
			artists: detailData.lineup,
			push: this.props.push
		};

		return (
			<Loader loaded={this.state.loaded}>
				<div id='detail' className='detail-page'>
					<EventDetailHeader {...detailInfo}/>
					<div className='flex-row links-container'>
						<div className='center flex-fixed'>
							LINEUP
						</div>
					</div>
					<ArtistTileContainer {...lineup} />
				</div>
			</Loader>
		);
	}

});

module.exports = EventDetail;