import React from 'react';
import mixpanelService from '../services/mixpanelService.js';
import {History} from 'react-router';

var LoginOverlay = React.createClass({

	mixins: [History],
	componentWillMount: function() {
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
				this.statusChangeCallback(response);
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
	},
	
	statusChangeCallback: function() {
		console.log('statusChangeCallback');
		console.log(response);
		if (response.status === 'connected') {
			// Logged into your app and Facebook.
			this.registerFacebookUser(response.authResponse)
		} else if (response.status === 'not_authorized') {
			// The person is logged into Facebook, but not your app.
				
		} else {
			// The person is not logged into Facebook, so we're not sure if
			// they are logged into this app or not.
			console.debug("Not logged into Facebook");
		}
	},

	checkLoginState: function() {
		FB.getLoginStatus(function(response) {
			this.statusChangeCallback(response);
		}.bind(this));
	},

	login: function() {
		FB.login(this.checkLoginState());
	},

	registerFacebookUser(auth) {
		$.ajax({
			type: "POST",
			url: constants.API_ROOT + "user/facebookRegister",
			data: {
					userData: {
							FB_TOKEN: auth
					}
			}
		}).done(function(response) {
			if(response.status == "success") {
				var push = this.props.push;

				push({
					type: 'SHALLOW_MERGE',
					data: {
						isUserLoggedIn: true,
						user: response.payload.user
					}
				});

				mixpanel.people.set_once({
					"First Name": registeredUser.first_name,
					"Last Name": registeredUser.last_name,
					"$email": registeredUser.username,
					"fb_id": registeredUser.facebook_id,
				});
			}
		});
	},

	render: function() {
		var loginStatus = this.props.appState.get('isUserLoggedIn');

		return (
			<div id='LoginOverlay' className='flex-column'>
				<div className='content flex-column center'>
					<div className='flex-row click facebook' 
					onClick={this.login}>
						<div className='flex icon'>
							<i className='fa fa-facebook center'/>
						</div>
						<div className='flex icon'>
							<div className='center'>Sign in with Facebook</div>
						</div>
					</div>
					<h1 className='hidden'>Features</h1>
					<div className='divider'/>
					<ul className='flex-column'>
						<li>Favorite the sets you want to listen to later</li>
						<br/>
						<li>Follow your favorite artists and unlock their exclusive content</li>
						<br/>
						<li>Discover new sets and events from artists you follow</li>
					</ul>
				</div>
			</div>
		);
	}

});

module.exports = LoginOverlay;