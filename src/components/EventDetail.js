import React from 'react';
import DetailView from './DetailView';

var EventDetail = React.createClass({
	displayName: 'EventDetail',
	render: function() {
		var data = this.props.appState.get('detailData');
		var push = thie.props.push;
		var TITLES = ['lineup'];
		var buttonText = 'Tickets';
		var info = data.formattedDate;
		var title = data.event;
		return (
			React.createElement(DetailView, {
				navTiles: TILES,
				data: data,
				buttonText: buttonText,
				info: info,
				title: title,
				push: push
			});
		);
	}
});

module.exports = EventDetail;