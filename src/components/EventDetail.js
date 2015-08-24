import React from 'react';
import DetailView from './DetailView';

var data = this.props.appState.get('detailData');
var TITLES = ['lineup'];
var buttonText = 'Tickets';
var info = data.formattedDate;
var title = data.event;

var EventDetail = React.createClass({
	displayName: 'ArtistDetail',
	render: function() {
		return (
			React.createElement(DetailView, {
				navTiles: TILES,
				data: data,
				buttonText: buttonText,
				info: info,
				title: title
			});
		);
	}
});

module.exports = EventDetail;