import React from 'react';
// import constants from '../constants/constants';
import GlobalEventHandler from './globalEventHandler';
import Immutable from 'immutable';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler, Navigation } from 'react-router';

import Footer from './components/Footer';
import Header from './components/Header';
import PlayerWrapper from './components/Player';
import DetailView from './components/DetailView';
import LandingView from './components/LandingView';
import Artists from './components/Artists';
import FeaturedView from './components/FeaturedView';
import HomeView from './components/HomeView';
import SearchResultsView from './components/SearchResultsView';

import SetTile from './components/SetTile';
import EventTile from './components/EventTile';
import TrackTile from './components/TrackTile';

//subscribe in componentDidMount()
//unsubscribe in componentWillUnmount()
//call setState which pushes to event stream when receiving an event

var initialAppState = Immutable.Map({
	currentSet: {asd:123},
	browseData: [
		{
			"artist": '12th Planet',
			"imageURL": "313e875b84fe6e0844b02509a8635cebb9f7d128.jpg"
		}
	]
});

var evtHandler = GlobalEventHandler(initialAppState);
//var evtTypes = evtHandler.types;

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
			appState: initialAppState
		};
	},

	componentDidMount: function() {
		this._attachStreams();
	},

	_attachStreams: function() {
		var _this = this;
		evtHandler.floodGate.subscribe(newState => {
			console.log('UPDATE', newState);
			_this.setState({ appState: newState });
		});
	},

	render: function() {
		var appState = this.state.appState;

		return (
			<div className="main-container flex-column">
				<Header appState={appState} pushFn={push} />
				<PlayerWrapper appState={appState}
											 pushFn={push}
											 routeHandler={RouteHandler} />
			</div>
		);
	}
});

var routes = (
	<Route path='/' handler={App}>
		<DefaultRoute name='landing' handler={LandingView}/>
		<Route name='user' path='user' handler={HomeView} />
		<Route name='featured' path='featured' handler={FeaturedView} />
		<Route name='artists' path='artists' handler={Artists}/>
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