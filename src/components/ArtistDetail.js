import React from 'react';
import {State} from 'react-router';
import Loader from 'react-loader';

import constants from '../constants/constants';
import DetailView from './DetailView';


var ArtistDetail = React.createClass({

	displayName: 'ArtistDetail',
	mixins: [State],
	getInitialState: function() {
		return {
			loaded: false
		};
	},
	componentWillMount: function() {
		this.getArtistData();
	},
	getArtistData: function() {
		var _this = this;
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

			_this.setState({
				loaded: true
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

		return (
			<Loader loaded={this.state.loaded}>
				<DetailView
					navTitles={navTitles}
					push={push}
					data={data}
					info={info}
					title={title}
					buttonText={buttonText} />
			</Loader>
		);
	}

});

module.exports = ArtistDetail;