import React from 'react';
import constants from '../constants/constants';
import playerService from '../services/playerService.js';
import favoriteSet from '../services/favoriteSet';

import Track from './Track';

var PlayerTracklist = React.createClass({

	displayName: 'PlayerTrackInfo',

	componentDidMount: function() {
		$('#open-tracklist, .active-track').click(function() {
			if($('.tracklist').hasClass('tracklist-open')) {
				$('.tracklist').removeClass('tracklist-open')
					.animate({ bottom: '-50vh'}, 200);
			} else {
				$('.tracklist').addClass('tracklist-open')
					.animate({ bottom: '10vh' }, 200);
			}
		});		
	},

	favoriteSet: function() {
		var loginStatus = this.props.appState.get('isUserLoggedIn');
		var user = this.props.appState.get('user');
		var id = this.props.appState.get('currentSet').id;

		if(loginStatus) {
			favoriteSet.favoriteSet(this.props.push, user, id);
		} else {
			this.history.pushState(null, '/user');
		}
	},

	shareToFacebook: function(e) {
		e.stopPropagation();
		var currentSet = this.props.appState.get('currentSet');

		var url = 'https://setmine.com/play/' + currentSet.id;
		FB.ui({
			method: 'feed',
			link: url,
			caption: 'Share this Set',
			picture: S3_ROOT_FOR_IMAGES + currentSet.artistimageURL
		}, function(response) {
			console.debug(response);
		});
	},

	shareToTwitter: function(e) {
		e.stopPropagation();
		var currentSet = this.props.appState.get('currentSet');
		var parameters = 'url=' + encodeURIComponent('https://setmine.com/play/' + currentSet.id + '&via=SetMineApp');
		window.open('https://twitter.com/intent/tweet?' + parameters, '_blank', 'height=420, width=550');
	},

	updateCurrentTrack: function() {
		var appState = this.props.appState;
		var push = this.props.push;
		playerService.updateCurrentTrack(appState, push)
	},

	render: function() {
		var appState = this.props.appState;
		var push = this.props.push;
		var _this = this;

		var tracklist = appState.get('tracklist');
		var currentTrack = appState.get('currentTrack');
		var loginStatus = appState.get('isUserLoggedIn');

		var tracks = tracklist.map(function(track, index) {
			//update tracklist to show current track
			if(track.trackname == currentTrack) {
				var trackStyle = 'flex track active'
			} else {
				var trackStyle = 'flex track'
			}

			var props = {
				className: trackStyle,
				key: index,
				trackname: track.trackname,
				starttime: track.starttime,
				appState: appState,
				push: push
			};

			return <Track {...props} />
		});

		if(loginStatus) {
			var favorited = favoriteSet.checkFavorite(appState.get('currentSet').id, appState.get('user').favorite_set_ids);
		} else {
			var favorited = false;
		}

		var favoriteClass = favorited ? 'fa fa-fw center fa-star' : 'fa fa-fw center fa-star-o';

		return (
			<div className='flex-row flex-fixed-2x' id='PlayerTracklist'>
				<div className='active-track center flex-fixed-3x'>{currentTrack}</div>
				<div className='tracklist'>
					{tracks}
				</div>
				<div className='flex-row flex-fixed'>
					<div className='set-flex flex click' id='open-tracklist'>
						<i className='fa fa-fw center fa-bars'/>
					</div>
					<div className='set-flex flex click' 
					onClick={this.updateCurrentTrack}>					
						<i className={favoriteClass} onClick={this.favoriteSet} />
					</div>
					<div className='flex-row flex'>
						<i className='link fa fa-fw fa-facebook center click' onClick={this.shareToFacebook} />
						<i className='link fa fa-fw fa-twitter center click' onClick={this.shareToTwitter} />
					</div>
				</div>
			</div>
		);
	}

});

module.exports = PlayerTracklist;