import React from 'react';
import {login} from '../services/loginService';

var LoginOverlay = React.createClass({

	contextTypes: {
		push: React.PropTypes.func
	},

	login() {
		login(this.context.push);
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
					<div className='divider'/>
					<ul className='flex-column'>
						<li>Favorite the sets you want to listen to later</li>
						<br/>
						<li>Unlock exclusive music from your favorite artists</li>
						<br/>
						<li>Discover new sets and events from artists you follow</li>
					</ul>
				</div>
			</div>
		);
	}

});

export default LoginOverlay;