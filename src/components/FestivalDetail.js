import React from 'react';
import DetailView from './DetailView';

var data = this.props.appState.get('detailData');
var TITLES = ['sets'];
var info = data.set_count + ' sets';
var title = data.event;

var FestivalDetail = React.createClass({
	displayName: 'ArtistDetail',
	render: function() {
		return (
			React.createElement(DetailView, {
				data: data,
				navTiles: TILES,
				info: info,
				title: title
			});
		);
	}
});

module.exports = FestivalDetail;