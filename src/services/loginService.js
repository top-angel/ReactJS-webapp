import React from 'react';
import constants from '../constants/constants';
import mixpanelService from './mixpanelService.js';

function startFacebookSDK(push) {
	window.fbAsyncInit = function() {
		FB.init({
			appId      : '674390762682640',
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
	console.log('statusChangeCallback');
	console.log(response);
	if (response.status === 'connected') {
		// Logged into your app and Facebook.
		registerFacebookUser(response.authResponse, push)
	} else if (response.status === 'not_authorized') {
		// The person is logged into Facebook, but not your app.
			
	} else {
		// The person is not logged into Facebook, so we're not sure if
		// they are logged into this app or not.
		console.debug("Not logged into Facebook");
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
		url: constants.API_ROOT + 'user/facebookRegister',
		data: {
			userData: {
				FB_TOKEN: auth
			}
		}
	}).done(function(response) {
		push({
			type: 'SHALLOW_MERGE',
			data: {
				isUserLoggedIn: true,
				user: response.payload.user
			}
		});

		console.log('kushdank 420');
		//UNHIDE ONCE MIXPANEL WORKS

		// mixpanel.people.set_once({
		// 	"First Name": registeredUser.first_name,
		// 	"Last Name": registeredUser.last_name,
		// 	"$email": registeredUser.username,
		// 	"fb_id": registeredUser.facebook_id,
		// });
	});
}

function login(push) {
	FB.login(checkLoginState(push));
}

module.exports = {
	login: login,
	startFacebookSDK: startFacebookSDK
}