import React from 'react';
import R from 'ramda';
import api from './api';
import mixpanelService from './mixpanelService';

export function startFacebookSDK(push) {
	window.fbAsyncInit = function() {
		FB.init({
			appId      : '648288801959503',
			cookie     : true,  // enable cookies to allow the server to access
												// the session
			xfbml      : true,  // parse social plugins on this page
			version    : 'v2.1' // use version 2.1
		});
			// Now that we've initialized the JavaScript SDK, we call
			// FB.getLoginStatus().  This function gets the state of the
			// person visiting this page and can return one of three states to
			// the callback you provide.  They can be:
			//
			// 1. Logged into your app ('connected')
			// 2. Logged into Facebook, but not your app ('not_authorized')
			// 3. Not logged into Facebook and can't tell if they are logged into
			//    your app or not.
			//
			// These three cases are handled in the callback function.
		FB.getLoginStatus(function(response) {
			statusChangeCallback(response, push);
		}.bind(this));
	}.bind(this);

	// Load the SDK asynchronously
	(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
}

function statusChangeCallback(response, push) {
	if (response.status === 'connected') {
		// Logged into setmine and Facebook.
		registerFacebookUser(response.authResponse.accessToken, push)
	} else if (response.status === 'not_authorized') {
		console.log('Logged into Facebook, but you need to authorize this app');
	} else {
		console.debug('Not logged into Facebook');
	}
}

// check if user is logged in
function checkLoginState(push) {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response, push);
	}.bind(this));
}

function registerFacebookUser(auth, push) {
	api.post('setmineuser/login/facebook', {
		facebook_token: auth
	}).then(res => {
		console.log('Successfully logged in to Setmine')
		var user = res.setmineuser_login_facebook

		// create array of users favorite setIds
		var favoriteSetIds = R.pluck('id', user.favorite_sets)

		// store setmine user in appState
		push({
			type: 'SHALLOW_MERGE',
			data: {
				isUserLoggedIn: true,
				user: user,
				favoriteSetIds: favoriteSetIds
			}
		})

		//track user after logging in for the first time
		mixpanel.identify(user.facebook_id);
		mixpanel.people.set_once({
			"First Name": user.first_name,
			"Last Name": user.last_name,
			"$email": user.username,
			"fb_id": user.facebook_id,
			"date_tracked": new Date()
		});
	})
}

// starts login process
export function login(push) {
	FB.login(checkLoginState(push));
}