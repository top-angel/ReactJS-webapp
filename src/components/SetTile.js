import React from 'react';
import { favoriteSet } from '../services/favoriteSet';
import { API_ROOT, S3_ROOT_FOR_IMAGES } from '../constants/constants';
import { Link } from 'react-router';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Motion } from 'react-motion';

import history from '../services/history'

var SetTile = React.createClass({

	getInitialState() {
		return {
			copied: false,
			open: false,
			copyText: 'Copy to Clipboard'
		};
	},

	getDefaultProps() {
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

	favoriteSet() {
		var {push, user, loginState} = this.props;
		if(loginStatus) {
			favoriteSet(push, user, this.props.id);
		} else {
			history.pushState(null, '/user');
		}
	},

	getSet() {
		return $.ajax({
			url: `${API_ROOT}sets/id/${this.props.id}`,
			type: 'get'
		})
	},

	openArtistPage() {
		var routePath = this.props.artist.split(' ').join('_');
		history.pushStateState(null, `/artist/${routePath}`);
		mixpanel.track("Artist Clicked", {
			"Artist": this.props.artist
		});
	},

	openFestivalPage() {
		if(this.props.is_radiomix == 0) {
			history.pushState(null, `/festival/${this.props.event_id}`);
		} else {
			history.pushState(null, `/mix/${this.props.event_id}`);
		}
	},

	playSet() {
		var push = this.props.push;
		this.getSet().done((res) => {
			var tracklist = res.payload.sets_id.tracks;
			console.log(tracklist)
			
			var set = {
				artist: this.props.artist,
				event: this.props.setName,
				id: this.props.id,
				set_length: this.props.set_length,
				songURL: this.props.songURL,
				artist_image: this.props.artist_image,
				starttime: '00:00'
			};

			console.log(set);

			push({
				type: 'SHALLOW_MERGE',
				data: {
					currentSet: set,
					tracklist: tracklist,
					currentTrack: tracklist[0].trackname,
					playing: true,
					timeElapsed: 0
				}
			});

			this.updatePlayCount(this.props.id);
		});
	},

	shareToFacebook() {
		var url = 'https://setmine.com/play/' + this.props.id;
		var self = this;

		FB.ui({
			method: 'feed',
			link: url,
			caption: 'Share this Set',
			picture: S3_ROOT_FOR_IMAGES + self.props.artist_image
		}, function(response) {
			console.debug(response);
		});
	},

	shareToTwitter() {
		var parameters = 'url=' + encodeURIComponent('https://setmine.com/play/' + this.props.id + '&via=SetMineApp');
		window.open('https://twitter.com/intent/tweet?' + parameters, '_blank', 'height=420, width=550');
	},

	updatePlayCount(id) {
		$.ajax({
			type: 'post',
			url: `${API_ROOT}sets/play`,
			data: {
				set_id: id,
				user_id: this.props.user.id
			},
			success(data) {
				console.log('play count updated')
			}
		})
	},

	render() {
		var eventImage = {
			backgroundImage: `url(${S3_ROOT_FOR_IMAGES+this.props.banner_image})`
		};
		var artistImage = S3_ROOT_FOR_IMAGES+this.props.artist_image;
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
						<div className='flex-fixed click flex-container play'
						onClick={this.playSet}>
							<i className='fa fa-play center'>{'  '+this.props.popularity}</i>
						</div>
						<div className='divider'/>
						<div className='flex-fixed flex-container'>
							<i className='fa fa-clock-o center'>{'  '+this.props.set_length}</i>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

export default SetTile;