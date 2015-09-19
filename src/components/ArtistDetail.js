import React from 'react';
import Loader from 'react-loader';
import R from 'ramda';
import constants from '../constants/constants';

import SetContainer from './SetContainer';
import EventContainer from './EventContainer';

import DetailNavContainer from './DetailNavContainer';
import DetailImageContainer from './DetailImageContainer';
import LinkButtonContainer from './LinkButtonContainer';

var ArtistDetail = React.createClass({

	displayName: 'ArtistDetail',

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

		var artist = this.props.params.artist;
		var query = artist.split('_').join('%20');
		console.log(query);

		var artistData,
			artistUrl = constants.API_ROOT + 'artist/search/' + query;

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
		var appState = this.props.appState;
		var push = this.props.push;

		var artistData = appState.get('detailData');
		var loginStatus = this.props.appState.get('isUserLoggedIn');
		var user = this.props.appState.get('user');

		var detailInfo = {
			appState: appState,
			push: push,
			title: artistData.artist,
			buttonText: 'Shuffle',
			imageURL: artistData.imageURL,
			info: artistData.set_count + ' sets | ' + artistData.event_count + ' events'
		};

		var links = [
			{
				type: 'facebook',
				url: artistData.fb_link
			},
			{
				type: 'twitter',
				url: artistData.twitter_link
			},
			{
				type: 'instagram',
				url: artistData.instagram_link
			},
			{
				type: 'soundcloud',
				url: artistData.soundcloud_link
			},
			{
				type: 'youtube',
				url: artistData.youtube_link
			}
		];

		var navTitles = [
			{
				title: 'sets',
				to: 'artist/'+this.props.params.artist
			},
			{
				title: 'events',
				to: 'artist/'+this.props.params.artist+'/events',
			}
		];

		return (
			<Loader loaded={this.state.loaded}>
				<div id='detail' className='view detail-page'>
					<DetailImageContainer {...detailInfo} />
					<LinkButtonContainer links={links}/>
					<div className='divider'/>
					<DetailNavContainer navTitles={navTitles} />
					{
						React.cloneElement(this.props.children, {
							sets: artistData.sets,
							events: artistData.upcomingEvents,
							push: push,
							loginStatus: loginStatus,
							user: user
						})
					}
				</div>
			</Loader>
		);
	}

});

module.exports = ArtistDetail;