import React from 'react';
import Loader from 'react-loader';
import constants from '../constants/constants';
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
		var data = this.props.appState.get('detailData');
		var push = this.props.push;

		var TITLES = [
			{
				title: 'lineup',
				to: 'event-lineup'
			}
		];

		var buttonText = 'Tickets';
		var info = data.formattedDate;
		var title = data.event;

		return (
			<Loader loaded={this.state.loaded}>
				<DetailView
					navTitles={TITLES}
					data={data}
					buttonText={buttonText}
					info={info}
					title={title}
					push={push} />
			</Loader>
		);
	}

});

module.exports = EventDetail;