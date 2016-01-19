import React from 'react';
import R from 'ramda';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Motion } from 'react-motion';

import history from '../services/history'
import {favoriteSet, checkIfFavorited} from '../services/favoriteSet'


var PlayerShare = React.createClass({
	contextTypes: {
		push: React.PropTypes.func,
		loginStatus: React.PropTypes.bool,
		user: React.PropTypes.object,
		favoriteSetIds: React.PropTypes.array
	},

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

	copyURL() {
		this.setState({
			copyText: 'Copied!'
		});
	},

	checkIfFavorited(id, favorites) {
		if(this.context.loginStatus) {
			return R.contains(id, favorites);
		} else {
			return false
		}
	},

	favoriteSet: function() {
		var setId = this.props.appState.get('currentSet').id;
		var {push, user, loginStatus} = this.context;

		if(loginStatus) {
			favoriteSet(setId, user.id, push);
		} else {
			// TODO show notification instead of page redirect
			history.pushState(null, '/user');
		}
	},

	shareToFacebook(e) {
		e.stopPropagation();
		var currentSet = this.props.appState.get('currentSet');

		var url = `https://setmine.com/play/${currentSet.id}`;
		FB.ui({
			method: 'feed',
			link: url,
			caption: 'Share this Set',
			picture: constants.S3_ROOT_FOR_IMAGES + currentSet.artistimageURL
		}, function(response) {
			console.debug(response);
			console.log('share to facebook failed');
		});
	},

	shareToTwitter(e) {
		e.stopPropagation();
		var currentSet = this.props.appState.get('currentSet');
		var parameters = 'url=' + encodeURIComponent('https://setmine.com/play/' + currentSet.id + '&via=SetMineApp');
		window.open('https://twitter.com/intent/tweet?' + parameters, '_blank', 'height=420, width=550');
	},

	render() {
		var appState = this.props.appState;
		var playURL = 'https://setmine.com/play/'+this.props.appState.get('currentSet').id;
		var self = this;

		// check if playing set is favorited
		// var favorited = this.checkIfFavorited(appState.get('currentSet').id, this.context.favoriteSetIds)
		var favorited = checkIfFavorited(this.context.loginStatus, appState.get('currentSet').id, this.context.favoriteSetIds)

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

export default PlayerShare;