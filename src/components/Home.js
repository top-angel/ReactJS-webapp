import React from 'react';
import constants from '../constants/constants';
import HomeSidebar from './HomeSidebar';
import LoginOverlay from './LoginOverlay';

var Home = React.createClass({

	componentDidMount() {
		mixpanel.track("User Home Page Open");
	},

	showOverLay() {
		if(loginStatus) {
			return;
		} else {
			return <LoginOverlay push={this.props.push} />
		}
	},

	render() {
		var containerClass = 'flex-row flex-fixed-4x tile-container';
		var loginStatus = this.props.appState.get('isUserLoggedIn');
		var user = this.props.appState.get('user');

		return (
			<div id="HomeView" className='flex-row'>
				{this.showOverlay()}
				<HomeSidebar user={user} />
				{
					React.cloneElement(this.props.children, {
						push: this.props.push,
						containerClass: containerClass,
						appState: this.props.appState
					})
				}
			</div>
		);
	}

});


module.exports = Home;