import React from 'react';
import Router from 'react-router';
<<<<<<< HEAD
import { DefaultRoute, Link, Route, RouteHandler, Navigation } from 'react-router';
var constants = require('./constants/constants');
=======
import { DefaultRoute, Route, RouteHandler } from 'react-router';

import GlobalEventHandler from './globalEventHandler';
>>>>>>> master

// TODO use ES6 imports moving forward
//var constants = require('./constants/constants');

//var Player = require('./components/Player');
//var Footer = require('./components/Footer');
var Header = require('./components/Header');
var DetailView = require('./components/DetailView');
var LandingView = require('./components/LandingView');
var BrowseView = require('./components/BrowseView');
var FeaturedView = require('./components/FeaturedView');
var HomeView = require('./components/HomeView');
var SearchResultsView = require('./components/SearchResultsView');

<<<<<<< HEAD
var SetTile = require('./components/SetTile');
var EventTile = require('./components/EventTile');
var TrackTile = require('./components/TrackTile');

=======

//var SetTile = require('./components/SetTile');
//var EventTile = require('./components/EventTile');
//var TrackTile = require('./components/TrackTile');

//var viewStream = require('./streams/viewStream');

// <FeaturedView landingEvents={landing} currentEvents={sampleCurrentEvents}/>
// <DetailView artistId={574} detailType='artist'/>

>>>>>>> master
//subscribe in componentDidMount()
//unsubscribe in componentWillUnmount()
//call setState which pushes to event stream when receiving an event
//

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
<<<<<<< HEAD
	mixins: [Navigation],
	render: function() {
		return (
			<div className="main-container flex-column">
				<Header />
				<RouteHandler />
				<Footer />
=======

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
>>>>>>> master
			</div>
		);
	}
});

<<<<<<< HEAD
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
=======

var routes = (
	<Route path='/'handler={App}>
		<DefaultRoute handler={SearchResultsView} />
		<Route path='home' handler={LandingView} />
		<Route path='browse' handler={BrowseView} />
		<Route path='featured' handler={FeaturedView} />
		<Route path='user' handler={HomeView} />
		<Route path='artist/:id' handler={DetailView} />
		<Route path='event/:id' handler={DetailView} />
>>>>>>> master
	</Route>
);

//var headMount = document.getElementById('head-mount-point');
var bodyMount = document.getElementById('body-mount-point');

Router.run(routes, Router.HashLocation, function(Root) {
	React.render(<Root/>, bodyMount);
});

// React.render(<App />, bodyMount);
