import React from 'react';
import R from 'ramda';
import api from '../services/api';

import Loader from 'react-loader';
import EventDetailHeader from './EventDetailHeader'
import ArtistTileContainer from './ArtistTileContainer';

var EventDetail = React.createClass({
	contextTypes: {
		push: React.PropTypes.func
	},

	getInitialState() {
		return {
			loaded: false
		};
	},

	componentWillMount() {
		this.getEventData(this.props.params.event);
	},

	getEventData(event) {
		api.get(`events/id/${event}`).then(res => {
			this.context.push({
				type: 'SHALLOW_MERGE',
				data: {
					detailData: res.events_id
				}
			})
		}).then(() => {
			this.setState({ loaded: true })
		})
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

export default EventDetail;