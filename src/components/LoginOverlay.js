import React from 'react';
import constants from '../constants/constants';
import {login} from '../services/loginService.js';

var LoginOverlay = React.createClass({

	login() {
		login(this.props.push);
	},

	render() {
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

export default LoginOverlay;