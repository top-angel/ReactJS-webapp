import React from 'react';
import {favoriteSet} from '../services/favoriteSet';
import constants from '../constants/constants';
import {History, Link} from 'react-router';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Motion } from 'react-motion';

var SetTile = React.createClass({

	displayName: 'Set Tile',
	mixins: [History],

	getInitialState() {
		return {
			copied: false,
			open: false,
			copyText: 'Copy to Clipboard'
		};
	},

	getDefaultProps: function() {
		return {
			starttime: 0,
			loginStatus: false,
			user: {},
			favorited: false
		};
	},

	animate() {
		this.setState({
			open: !this.state.open,
			copyText: 'Copy to Clipboard'
		});
	},

	copyURL() {
		this.setState({
			copyText: 'Copied!'
		});
	},

	favoriteSet: function() {
		var push = this.props.push;
		var user = this.props.user;
		var loginStatus = this.props.loginStatus;

		var favoriteUrl = `${constants.API_ROOT}user/updateFavoriteSets`;
		var self = this;

		if(loginStatus) {
			favoriteSet(push, user, this.props.id);
		} else {
			this.history.pushState(null, '/user');
		}
	},

	getTracklist: function() {
		var trackListUrl = constants.API_ROOT + 'tracklist/' + this.props.id;

		return $.ajax({
			url: trackListUrl,
			type: 'get'
		});
	},

	openArtistPage: function() {
		var routePath = this.props.artist.split(' ').join('_');
		this.history.pushState(null, `/artist/${routePath}`);
		mixpanel.track("Artist Clicked", {
			"Artist": this.props.artist
		});
	},

	openFestivalPage: function() {
		var routePath = this.props.event.split(' ').join('-');

		if(this.props.is_radiomix == 0) {
			//go to festival page
			this.history.pushState(null, `/festival/${routePath}`);
		} else {
			//go to mix page
			this.history.pushState(null, `/mix/${routePath}`);
		}
	},

	playSet: function() {
		var push = this.props.push;
		var self = this;

		this.getTracklist().done(function(res) {
			var tracklist = res.payload.tracks;
			var set = {
				artist: self.props.artist,
				event: self.props.setName,
				id: self.props.id,
				set_length: self.props.set_length,
				songURL: self.props.songURL,
				artistimageURL: self.props.artistimageURL,
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

			self.updatePlayCount(self.props.id);
		});
	},

	shareToFacebook: function() {
		var url = 'https://setmine.com/play/' + this.props.id;
		var self = this;

		FB.ui({
			method: 'feed',
			link: url,
			caption: 'Share this Set',
			picture: constants.S3_ROOT_FOR_IMAGES + self.props.artistimageURL
		}, function(response) {
			console.debug(response);
		});
	},

	shareToTwitter: function() {
		var parameters = 'url=' + encodeURIComponent('https://setmine.com/play/' + this.props.id + '&via=SetMineApp');
		window.open('https://twitter.com/intent/tweet?' + parameters, '_blank', 'height=420, width=550');
	},

	updatePlayCount: function(id) {
		$.ajax({
			type: 'POST',
			url: constants.API_ROOT + 'playCount',
			data: {
				id: id
			},
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
		var favorite = this.props.favorited ? 'link fa fa-fw fa-star center click' : 'link fa fa-fw fa-star-o center click';
		var playURL = `https://setmine.com/play/${this.props.id}`;
		var self = this;

		return (
			<div className='flex-column set-tile' style={eventImage}>
				<div className='detail flex-column'>
					<div className='flex-row flex-fixed-2x'>
						<img src={artistImage} className='click' onClick={this.openArtistPage} />
						<div className='flex-column flex'>
							<div className='flex click link set-name' onClick={this.openFestivalPage}>{this.props.setName}</div>
							<div className='flex click link artist' to='artist' onClick={this.openArtistPage}>{this.props.artist}</div>
	                    <div className='flex flex-row'>
	                    	<Motion style={{ 
									y: this.state.open ? 'visible' : 'hidden'
								}}>
									{
										({y}) =>
										<div className='modal flex-container' style={{
											visibility: `${y}`
										}}>
											<div className='text'>{self.state.copyText}</div>
											<span/>
										</div>
									}
								</Motion>
								<i className={favorite} onClick={this.favoriteSet} />
								<CopyToClipboard text={playURL} onCopy={() => { self.copyURL() }}>
									<i className='link fa fa-fw fa-clipboard center click'
										onMouseEnter={() => {self.animate()}}
										onMouseLeave={() => {self.animate()}} />
								</CopyToClipboard>
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