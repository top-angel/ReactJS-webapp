import React from 'react';
import constants from '../constants/constants';
import HomeSidebar from './HomeSidebar';
import LoginOverlay from './LoginOverlay';

var HomeView = React.createClass({

	render: function() {
		var containerClass = 'flex-row flex-fixed-4x tile-container';

		var loginStatus = this.props.appState.get('isUserLoggedIn');
		var user = this.props.appState.get('user');

		return (
			<div id="HomeView" className="view flex-row overlay-container">
				<LoginOverlay 
					appState={this.props.appState} 
					push={this.props.push}
				/>
				<HomeSidebar 
					appState={this.props.appState}
					user={user}
				/>
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


module.exports = HomeView;