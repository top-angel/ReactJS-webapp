import React from 'react';
import constants from '../constants/constants';
import {History, Link} from 'react-router';

var SetTile = React.createClass({

	displayName: 'Set Tile',
	mixins: [History],

	getDefaultProps: function() {
		return {
			starttime: 0
		};
	},

	favoriteSet: function() {
		var push = this.props.push;
		var favoriteUrl = API_ROOT + 'user/updateFavoriteSets';
		//TODO

		$.ajax({
			type: 'POST',
			url: favoriteUrl,
			data: {
				'userData': {
					'userID': 108,
					'setId': this.props.id
				}
			},
			success: function(response) {
				var registeredUser = response.payload.user;
				//TODO change class of favorite set
			}
		});
	},

	getTracklist: function() {
		var trackListUrl = constants.API_ROOT + 'tracklist/' + this.props.id;

		return $.ajax({
			url: trackListUrl,
			type: 'get'
		});
	},

	openArtistPage: function() {
		var routePath = this.props.artist.split(' ').join('-');
		this.history.pushState(null, '/artist/' + routePath);
	},

	openFestivalPage: function() {
		var routePath = this.props.event.split(' ').join('-');

		if(this.props.is_radiomix == 0) {
			//go to festival page
			this.history.pushState(null, '/festival/' + routePath);
		} else {
			var routeId = this.props.event_id;//quick fix for now
			this.history.pushState(null, '/mix/' + routeId);
		}
	},

	playSet: function() {
		var push = this.props.push;
		var _this = this;

		this.getTracklist().done(function(res) {
			var tracklist = res.payload.tracks;
			var set = {
				artist: _this.props.artist,
				event: _this.props.event,
				id: _this.props.id,
				set_length: _this.props.set_length,
				songURL: _this.props.songURL,
				artistimageURL: _this.props.artistimageURL,
				starttime: '00:00'
			};

			push({
				type: 'SHALLOW_MERGE',
				data: {
					currentSet: set,
					tracklist: tracklist,
					currentTrack: res.payload.tracklist[0],
					playing: true,
					timeElapsed: 0
				}
			});

			//TODO make sure this works
			this.history.replaceState(null, '/play/' + _this.props.id);
			_this.updatePlayCount(_this.props.id);
		});
	},

//TODO change URL to new routes
	shareToFacebook: function() {
		var url = 'https://setmine.com/?play/' + this.props.id;

		FB.ui({
			method: 'feed',
			link: url,
			caption: 'Share this Set',
			picture: S3_ROOT_FOR_IMAGES + this.props.artistimageURL
		}, function(response) {
			console.debug(response);
		});
	},

	shareToTwitter: function() {
		var parameters = 'url=' + encodeURIComponent('https://setmine.com/?play/' + this.props.id + '&via=SetMineApp');
			window.open('https://twitter.com/intent/tweet?' + parameters, '_blank', 'height=420, width=550');
	},

	updatePlayCount: function(id) {
		//todo get url
		$.ajax({
			type: 'POST',
			url: '/playCount',
			data: id,
			success: function(data) {
				console.log('play count updated');
			}
		});
	},

	render: function() {
		var eventImage = {
			backgroundImage: "url('"+constants.S3_ROOT_FOR_IMAGES + this.props.main_eventimageURL + "')"
		};
		var artistImage = constants.S3_ROOT_FOR_IMAGES+'small_'+this.props.artistimageURL;

		return (
			<div className='flex-column set-tile' style={eventImage}>
				<div className='detail flex-column'>
					<div className='flex-row flex-fixed-2x'>
						<img src={artistImage} className='click' onClick={this.openArtistPage} />
						<div className='flex-column flex'>
							<div className='flex click link' onClick={this.openFestivalPage}>{this.props.event}</div>
							<div className='flex click link' to='artist' onClick={this.openArtistPage}>{this.props.artist}</div>
	                    <div className='flex flex-row'>
								<i className='link fa fa-fw fa-star-o center click'/>
								<i className='link fa fa-fw fa-facebook center click' onClick={this.shareToFacebook} />
								<i className='link fa fa-fw fa-twitter center click' onClick={this.shareToTwitter}/>
	                    </div>
						</div>
					</div>
					<div className='divider center'/>
					<div className='flex-row flex-fixed'>
						<div className='flex-fixed click set-flex play'
						onClick={this.playSet}>
							<i className='fa fa-play center'>{'  '+this.props.popularity}</i>
						</div>
						<div className='divider'/>
						<div className='flex-fixed set-flex'>
							<i className='fa fa-clock-o center'>{'  '+this.props.set_length}</i>
						</div>
					</div>
				</div>

			</div>
		)
	}
});

module.exports = SetTile;