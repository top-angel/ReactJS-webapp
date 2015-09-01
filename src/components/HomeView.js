import React from 'react';
import constants from '../constants/constants';
import {RouteHandler} from 'react-router';
import HomeSidebar from './HomeSidebar';
import Routes from '../Routes';

var HomeView = React.createClass({

	render: function() {
		return (
			<div id="HomeView" className="view flex-row overlay-container">
				<HomeSidebar appState={this.props.appState}/>
				<RouteHandler appState={this.props.appState} push={this.props.push}/>
			</div>
		);
	}

});


module.exports = HomeView;