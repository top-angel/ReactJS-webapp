import React from 'react';
import {API_ROOT} from '../constants/constants';
import mixpanelService from './mixpanelService.js';

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
	console.log('facebook API response', response);
	if (response.status === 'connected') {
		// Logged into your app and Facebook.
		// registerFacebookUser(response.authResponse, push)
		registerFacebookUser(response.authResponse.accessToken, push)
	} else if (response.status === 'not_authorized') {
		// The person is logged into Facebook, but not your app.
		console.log('Logged into Facebook, but you need to authorize this app');
	} else {
		// The person is not logged into Facebook, so we're not sure if
		// they are logged into this app or not.
		console.debug('Not logged into Facebook');
	}
}

function checkLoginState(push) {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response, push);
	}.bind(this));
}

function registerFacebookUser(auth, push) {
	$.ajax({
		type: 'POST',
		url: `${API_ROOT}setmineuser/login/facebook`,
		data: {
			facebook_token: auth
		}
	}).done(res => {
		console.log(res)
		push({
			type: 'SHALLOW_MERGE',
			data: {
				isUserLoggedIn: true,
				user: res.payload.setmineuser_login_facebook
			}
		});

		// check if user is logged in
		console.log('successfully logged in');

		//track user after logging in for the first time
		mixpanel.identify(res.payload.user.facebook_id);
		mixpanel.people.set_once({
			"First Name": res.payload.user.first_name,
			"Last Name": res.payload.user.last_name,
			"$email": res.payload.user.username,
			"fb_id": res.payload.user.facebook_id,
			"date_tracked": new Date()
		});
	});
}

export function login(push) {
	FB.login(checkLoginState(push));
}