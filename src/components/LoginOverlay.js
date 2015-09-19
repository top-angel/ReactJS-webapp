import React from 'react';
import constants from '../constants/constants';
import loginService from '../services/loginService.js';
import {History} from 'react-router';

var LoginOverlay = React.createClass({

	mixins: [History],

	login() {
		loginService.login(this.props.push);
	},

	render: function() {
		var loginStatus = this.props.appState.get('isUserLoggedIn');
		return (
			<div id='LoginOverlay' className='flex-column' >
				<div className='content flex-column center'>
					<div className='flex-row click facebook'
					onClick={this.login} >
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