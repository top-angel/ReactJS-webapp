import React from 'react';
import Loader from 'react-loader';
import {Link} from 'react-router';
import R from 'ramda';
import constants from '../constants/constants';

import SetContainer from './SetContainer';
import EventContainer from './EventContainer';

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
		var self = this;
		var push = this.props.push;
		var artist = this.props.params.artist;
		var query = artist.split('_').join('%20');
		var artistData,
			artistUrl = constants.API_ROOT + 'artist/search/' + query;

		$.ajax({
			url: artistUrl,
			type: 'get'
		})
		.done(function(response) {
			artistData = response.payload.artist;

			push({
				type: 'SHALLOW_MERGE',
				data: {
					detailId: artistData.id,
					detailData: artistData
				}
			});

			self.setState({
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

		var setText = artistData.set_count > 1 ? ' sets | ' : ' set | ';
		var eventText = artistData.event_count != 1 ? ' events' : ' event';

		var detailInfo = {
			appState: appState,
			push: push,
			title: artistData.artist,
			buttonText: 'Shuffle',
			imageURL: artistData.imageURL,
			info: artistData.set_count + setText + artistData.event_count + eventText
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

		return (
			<Loader loaded={this.state.loaded}>
				<div id='detail' className='view detail-page'>
					<DetailImageContainer {...detailInfo} />
					<LinkButtonContainer links={links}/>
					<div className='divider'/>
					<div className="flex-row links-container">
						<Link className='click flex-fixed set-flex'
							to={'/artist/'+this.props.params.artist}
							onlyActiveOnIndex={true}
							activeClassName='active'>
							<div className='center'>sets</div>
						</Link>
						<Link className='click flex-fixed set-flex'
							to={'/artist/'+this.props.params.artist+'/events'}
							activeClassName='active'>
							<div className='center'>events</div>
						</Link>
					</div>
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