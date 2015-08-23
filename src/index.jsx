import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Route, RouteHandler } from 'react-router';

import GlobalEventHandler from './globalEventHandler';

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


//var SetTile = require('./components/SetTile');
//var EventTile = require('./components/EventTile');
//var TrackTile = require('./components/TrackTile');

//var viewStream = require('./streams/viewStream');

// <FeaturedView landingEvents={landing} currentEvents={sampleCurrentEvents}/>
// <DetailView artistId={574} detailType='artist'/>

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
			</div>
		);
	}
});


var routes = (
	<Route path='/'handler={App}>
		<DefaultRoute handler={SearchResultsView} />
		<Route path='home' handler={LandingView} />
		<Route path='browse' handler={BrowseView} />
		<Route path='featured' handler={FeaturedView} />
		<Route path='user' handler={HomeView} />
		<Route path='artist/:id' handler={DetailView} />
		<Route path='event/:id' handler={DetailView} />
	</Route>
);

//var headMount = document.getElementById('head-mount-point');
var bodyMount = document.getElementById('body-mount-point');

Router.run(routes, Router.HashLocation, (Root) => {
	console.log(Root);
	React.render(<Root/>, bodyMount);
});

// React.render(<App />, bodyMount);
