import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler, Navigation } from 'react-router';
var constants = require('./constants/constants');

var Player = require('./components/Player');
var Footer = require('./components/Footer');
var Header = require('./components/Header');
var DetailView = require('./components/DetailView');
var LandingView = require('./components/LandingView');
var BrowseView = require('./components/BrowseView');
var FeaturedView = require('./components/FeaturedView');
var HomeView = require('./components/HomeView');
var SearchResultsView = require('./components/SearchResultsView');

var SetTile = require('./components/SetTile');
var EventTile = require('./components/EventTile');
var TrackTile = require('./components/TrackTile');

//subscribe in componentDidMount()
//unsubscribe in componentWillUnmount()
//call setState which pushes to event stream when receiving an event

var App = React.createClass({
	getInitialState: function() {
		return {
			searchInput: '',
			setPlaying: null,
			userLoggedIn: false,
		};
	},
	mixins: [Navigation],
	render: function() {
		return (
			<div className="main-container flex-column">
				<Header />
				<RouteHandler />
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

var headMount = document.getElementById('head-mount-point');
var bodyMount = document.getElementById('body-mount-point');

Router.run(routes, Router.HashLocation, function(Root) {
	React.render(<Root/>, bodyMount);
});

// React.render(<App />, bodyMount);