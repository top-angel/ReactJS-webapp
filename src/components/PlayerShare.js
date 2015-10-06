import React, {addons} from 'react';
import favoriteSet from '../services/favoriteSet';
import {History} from 'react-router';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Motion } from 'react-motion';

var PlayerShare = React.createClass({

	mixins: [History],

	getInitialState() {
		return {
			open: false,
			copyText: 'Copy to Clipboard'
		};
	},

	animate(text) {
		this.setState({
			open: !this.state.open,
			copyText: 'Copy to Clipboard'
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

	shareToFacebook(e) {
		e.stopPropagation();
		var currentSet = this.props.appState.get('currentSet');

		var url = 'https://setmine.com/play/' + currentSet.id;
		FB.ui({
			method: 'feed',
			link: url,
			caption: 'Share this Set',
			picture: constants.S3_ROOT_FOR_IMAGES + currentSet.artistimageURL
		}, function(response) {
			console.debug(response);
		});
	},

	shareToTwitter(e) {
		e.stopPropagation();
		var currentSet = this.props.appState.get('currentSet');
		var parameters = 'url=' + encodeURIComponent('https://setmine.com/play/' + currentSet.id + '&via=SetMineApp');
		window.open('https://twitter.com/intent/tweet?' + parameters, '_blank', 'height=420, width=550');
	},

	copyURL() {
		this.setState({
			copyText: 'Copied!'
		});
	},

	render() {
		var appState = this.props.appState;
		var loginStatus = appState.get('isUserLoggedIn');
		var playURL = 'https://setmine.com/play/'+this.props.appState.get('currentSet').id;
		var self = this;

		if(loginStatus) {
			var favorited = favoriteSet.checkFavorite(appState.get('currentSet').id, appState.get('user').favorite_set_ids);
		} else {
			var favorited = false;
		}

		var favoriteClass = favorited ? 'link fa fa-fw center fa-star' : 'link fa fa-fw center fa-star-o';

		return (
			<div className='flex-row' id='PlayerShare'>
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
				<i className={favoriteClass} 
					onClick={this.favoriteSet} />

				<CopyToClipboard text={playURL} onCopy={() => { self.copyURL() }}>
					<i className='link fa fa-fw fa-clipboard center click'
						onMouseEnter={() => {self.animate()}}
						onMouseLeave={() => {self.animate()}} />
				</CopyToClipboard>

				<i className='link fa fa-fw fa-facebook center click'
					onClick={this.shareToFacebook} />
				<i className='link fa fa-fw fa-twitter center click' 
					onClick={this.shareToTwitter} />
			</div>
		);
	}

});

module.exports = PlayerShare;