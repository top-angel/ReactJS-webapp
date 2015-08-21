import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

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

console.log(SearchResultsView);

var SetTile = require('./components/SetTile');
var EventTile = require('./components/EventTile');
var TrackTile = require('./components/TrackTile');

var viewStream = require('./streams/viewStream');

// <FeaturedView landingEvents={landing} currentEvents={sampleCurrentEvents}/>
// <DetailView artistId={574} detailType='artist'/>

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
	_attachStream: function() {
		var _this = this;

		function updateActiveView (view) {
			_this.setState({
				activeView: view
			});
		}
	},
	render: function() {
		var activeView = this.state.activeView;
		return (
			<div className="main-container flex-column">
				<Header />
				<RouteHandler />
			</div>
		);
	}
});


var App2 = React.createClass({
	render: function() {

		return (<div>
					<h1> FUCK </h1>
					<RouteHandler />
				 </div>);
	}
});

var routes = (
	<Route path='/' handler={App}>
		<Route path='home' handler={LandingView} />
		<Route path='browse' handler={BrowseView}></Route>
		<Route path='featured' handler={FeaturedView} />
		<Route path='user' handler={HomeView} />
		<DefaultRoute handler={SearchResultsView} />
		<Route path='artist/:id' handler={DetailView} />
		<Route path='event/:id' handler={DetailView} />
	</Route>
);

var headMount = document.getElementById('head-mount-point');
var bodyMount = document.getElementById('body-mount-point');

Router.run(routes, Router.HashLocation, (Root) => {
	console.log(Root);
	React.render(<Root/>, bodyMount);
})

// React.render(<App />, bodyMount);