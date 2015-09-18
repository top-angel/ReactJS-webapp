import React from 'react';
import constants from '../constants/constants';
import HomeSidebar from './HomeSidebar';
import LoginOverlay from './LoginOverlay';

var HomeView = React.createClass({

	render: function() {
		var containerClass = 'flex-row flex-fixed-4x results-container';

		return (
			<div id="HomeView" className="view flex-row overlay-container">
				<LoginOverlay appState={this.props.appState} push={this.props.push} />
				<HomeSidebar appState={this.props.appState}/>
				{
					React.cloneElement(this.props.children, {
						appState: this.props.appState,
						push: this.props.push,
						containerClass: containerClass
					})
				}
			</div>
		);
	}

});


module.exports = HomeView;