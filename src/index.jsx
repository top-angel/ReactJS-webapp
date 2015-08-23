import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler, Navigation } from 'react-router';
import constants from './constants/constants';
import GlobalEventHandler from './globalEventHandler';

import Footer from './components/Footer';
import Header from './components/Header';
import DetailView from './components/DetailView';
import LandingView from './components/LandingView';
import BrowseView from './components/BrowseView';
import FeaturedView from './components/FeaturedView';
import HomeView from './components/HomeView';
import SearchResultsView from './components/SearchResultsView';

import SetTile from './components/SetTile';
import EventTile from './components/EventTile';
import TrackTile from './components/TrackTile';

var evtHandler = GlobalEventHandler({hola:'world'});
var evtTypes = evtHandler.types;

var push = evtHandler.push;


function lol() {
	push({
		type: evtTypes.SHALLOW_MERGE,
		data: { lastClick: new Date() }
	});
}


var PrintObject = React.createClass({
	displayName: 'PrintObject',
	render: function() {
		var s = JSON.stringify(this.props.value, null, 2);
		console.log('PO APP STATE', this.props.value);
		return React.createElement('code', {
			style: { fontSize: 10 },
			onClick: lol
		}, s);
	}
});


var App = React.createClass({
	displayName: 'App container',
	getInitialState: function() {
		return {
			// Let's assume that other ephemeral state
			// MAY have to exist here.
			appState: {}
		};
	},
	componentDidMount: function() {
		this._attachStreams();
	},
	_attachStreams: function() {
		var _this = this;
		evtHandler.floodGate.subscribe(newState => {
			_this.setState({ appState: newState });
		});
	},
	render: function() {
		var appState = this.state;

		return (
			<div className="main-container flex-column">
				<PrintObject value={appState} />
				<Header appState={appState} pushFn={push} />
				<RouteHandler appState={appState} pushFn={push} />
				<Footer />
			</div>
		);
	}
});

var routes = (
	<Route path='/' handler={App}>
		<DefaultRoute name='landing' handler={LandingView} />
		<Route name='user' path='user' handler={HomeView} />
		<Route name='featured' path='featured' handler={FeaturedView} />
		<Route name='browse' path='browse' handler={BrowseView}/>
		<Route name='search' path='search' handler={SearchResultsView} />
		<Route name='artist' path='artist' handler={DetailView}>
			<Route path=':id'/>
		</Route>
		<Route name='event' path='event' handler={DetailView}>
			<Route path=':id'/>
		</Route>
	</Route>
);

//var headMount = document.getElementById('head-mount-point');
var bodyMount = document.getElementById('body-mount-point');

Router.run(routes, Router.HashLocation, function(Root) {
	React.render(<Root/>, bodyMount);
});

// React.render(<App />, bodyMount);
