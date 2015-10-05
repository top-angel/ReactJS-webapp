import React from 'react';
import favoriteSet from '../services/favoriteSet';
import {History} from 'react-router';

var PlayerShare = React.createClass({

	mixins: [History],

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
			picture: constants.S3_ROOT_FOR_IMAGES + currentSet.artistimageURL
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

	shareLink: function() {
		// body...
	},

	render: function() {
		var appState = this.props.appState;
		var loginStatus = appState.get('isUserLoggedIn');

		if(loginStatus) {
			var favorited = favoriteSet.checkFavorite(appState.get('currentSet').id, appState.get('user').favorite_set_ids);
		} else {
			var favorited = false;
		}

		var favoriteClass = favorited ? 'link fa fa-fw center fa-star' : 'link fa fa-fw center fa-star-o';

		//add share button for play link
		return (
			<div className='flex-row' id='PlayerShare'>
				<i className={favoriteClass} onClick={this.favoriteSet} />
				<i className='link fa fa-fw fa-facebook center click' onClick={this.shareToFacebook} />
				<i className='link fa fa-fw fa-twitter center click' onClick={this.shareToTwitter} />

			</div>
		);
	}

});

module.exports = PlayerShare;