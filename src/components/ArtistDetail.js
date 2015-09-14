import React from 'react';
import {State} from 'react-router';
import Loader from 'react-loader';
import R from 'ramda';

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

	componentDidMount: function() {
		// this.getArtistFromURL();
	},

	// getArtistFromURL: function() {
	// 	var _this = this;
	// 	var push = this.props.push;

	// 	var artist = this.props.params.artist;
	// 	var searchUrl = constants.API_ROOT + 'search/' + artist;

	// 	var detailId = $.ajax({
	// 		url: searchUrl,
	// 		type: 'get',
	// 	})
	// 	.done(function(response) {
	// 		var artistData = R.head(response.payload.search.artists);

	// 		push({
	// 			type: 'SHALLOW_MERGE',
	// 			data: {
	// 				detailId: artistData.id,
	// 				detailData: artistData
	// 			}
	// 		});

	// 		_this.setState({
	// 			loaded: true
	// 		});
	// 	});
	// },

	render: function() {
		var appState = this.props.appState
		var detailData = appState.get('detailData');

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
		var info = detailData.set_count + ' sets | ' + detailData.event_count + ' events';

		var props = {
			navTitles: navTitles,
			push: this.props.push,
			info: info,
			data: detailData,
			title: detailData.artist,
			buttonText: 'Shuffle'
		};

		return (
			<Loader loaded={this.state.loaded}>
				<DetailView {...props} />
			</Loader>
		);
	}

});

module.exports = ArtistDetail;