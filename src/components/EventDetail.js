import React from 'react';
import R from 'ramda';
import constants from '../constants/constants';

import Loader from 'react-loader';
import DetailImageContainer from './DetailImageContainer';
import ArtistTileContainer from './ArtistTileContainer';

var EventDetail = React.createClass({

	displayName: 'EventDetail',
	getInitialState: function() {
		return {
			loaded: false
		};
	},

	componentWillMount: function() {
		this.getEventData();
	},

	getEventData: function() {
		var _this = this;
		var push = this.props.push;
		var event = this.props.params.event;

		var eventData,
			eventUrl = constants.API_ROOT + 'upcoming/id/' + event;

		$.ajax({
			url: eventUrl,
			type: 'get',
		})
		.done(function(response) {
			eventData = response.payload.upcoming;

			push({
				type: 'SHALLOW_MERGE',
				data: {
					detailId: eventData.id,
					detailData: eventData
				}
			});

			_this.setState({
				loaded: true
			});
		});
	},
	render: function() {
		var appState = this.props.appState;
		var detailData = appState.get('detailData');

		var detailInfo = {
			push: this.props.push,
			info: detailData.formattedDate,
			data: detailData,
			title: detailData.event,
			ticketLink: detailData.ticket_link,
			buttonText: 'Tickets',
			pageType: 'upcoming'
		};

		var lineup = {
			artists: detailData.lineup,
			push: this.props.push
		};

		return (
			<Loader loaded={this.state.loaded}>
				<div id='detail' className='view detail-page'>
					<DetailImageContainer {...detailInfo}/>
					<div className="flex-row links-container">
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