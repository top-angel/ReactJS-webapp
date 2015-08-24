import React from 'react';
import DetailView from './DetailView';

var data = this.props.appState.get('detailData');
var TITLES = ['sets', 'events'];
var buttonText = 'Follow';
var info = data.set_count + ' |sets ' + data.event_count + ' events';
var title = data.artist;

var ArtistDetail = React.createClass({
	displayName: 'ArtistDetail',
	render: function() {
		return (
			React.createElement(DetailView, {
				navTiles: navTiles,
				data: data,
				info: info,
				buttonText: buttonText,
				title: title
			})
		);
	}
});

module.exports = ArtistDetail;