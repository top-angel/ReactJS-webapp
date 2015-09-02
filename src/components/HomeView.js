import React from 'react';
import constants from '../constants/constants';
import {RouteHandler} from 'react-router';
import HomeSidebar from './HomeSidebar';
import Routes from '../index';

var HomeView = React.createClass({

	render: function() {
		var containerClass = 'flex-row flex-fixed-4x results-container';

		return (
			<div id="HomeView" className="view flex-row overlay-container">
				<HomeSidebar appState={this.props.appState}/>
				<RouteHandler
					appState={this.props.appState}
					push={this.props.push}
					containerClass={containerClass}
					/>
			</div>
		);
	}

});


module.exports = HomeView;