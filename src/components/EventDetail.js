import React from 'react';
import R from 'ramda';
import constants from '../constants/constants';

import Loader from 'react-loader';
import DetailView from './DetailView';

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
		var eventId = this.props.appState.get('detailId');

		var eventData,
			eventUrl = constants.API_ROOT + 'upcoming/id/' + eventId;

		$.ajax({
			url: eventUrl,
			type: 'get',
		})
		.done(function(response) {
			eventData = response.payload.upcoming;
			console.log(eventData);

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
		var detailData = this.props.appState.get('detailData');

		var navTitles = [
			{
				title: 'lineup',
				to: 'event-lineup'
			}
		];

		var props = {
			navTitles: navTitles,
			push: this.props.push,
			info: detailData.formattedDate,
			data: detailData,
			title: detailData.event,
			buttonText: 'Tickets'
		};

		return (
			<Loader loaded={this.state.loaded}>
				<DetailView {...props} />
			</Loader>
		);
	}

});

module.exports = EventDetail;