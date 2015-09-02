import React from 'react';
import {Navigation} from 'react-router';

import constants from '../constants/constants';
import DetailView from './DetailView';


var ArtistDetail = React.createClass({
	displayName: 'ArtistDetail',
	componentWillMount: function() {
		this.getArtistData();
	},
	getArtistData: function() {
		var push = this.props.push;
		var artistId = this.props.appState.get('detailId');
		var artistData,
			artistUrl = constants.API_ROOT + 'artist/' + artistId;

		$.ajax({
			url: artistUrl,
			type: 'get'
		})
		.done(function(response) {
			artistData = response.payload.artist;
			console.log(artistData);
			push({
				type: 'SHALLOW_MERGE',
				data: {
					detailId: artistData.id,
					detailData: artistData
				}
			});
		});
	},
	render: function() {
		var appState = this.props.appState
		var data = appState.get('detailData');
		var push = this.props.push;
		var navTitles = [
			{
				title: 'sets',
				to: 'artist-sets'
			},
			{
				title: 'events',
				to: 'artist-events'
			}
		];
		var buttonText = 'Shuffle';//TODO delete if we don't have functionality
		var info = data.set_count + ' sets | ' + data.event_count + ' events';
		var title = data.artist;
		//TODO add imageURL if API imageURL's are different 

		//detail view must have these props to render
		return (
			<DetailView
				navTitles={navTitles}
				push={push}
				data={data}
				info={info}
				title={title}
				buttonText={buttonText}/>
		);
	}
});

module.exports = ArtistDetail;