import React from 'react';
import Immutable from 'immutable';
import Router from 'react-router';
import { IndexRoute, Link, Route, History, Redirect } from 'react-router';
import GlobalEventHandler from './services/globalEventHandler';
import loginService from './services/loginService';

import Footer from './components/Footer';
import Header from './components/Header';
import Player from './components/Player';
import LandingView from './components/LandingView';
import EventsView from './components/EventsView';
import HomeView from './components/HomeView';
import SetsView from './components/SetsView';
import SearchResultsView from './components/SearchResultsView';

import UpcomingEvents from './components/UpcomingEvents';
import ClosestEvents from './components/ClosestEvents';

import ArtistDetail from './components/ArtistDetail';
import FestivalDetail from './components/FestivalDetail';
import ActivityDetail from './components/ActivityDetail';
import MixDetail from './components/MixDetail';
import EventDetail from './components/EventDetail';

import Favorites from './components/Favorites';
import NewSets from './components/NewSets';
import NewEvents from './components/NewEvents';

import Recent from './components/Recent';
import Popular from './components/Popular';
import Artists from './components/Artists';
import Festivals from './components/Festivals';
import Mixes from './components/Mixes';
import Activities from './components/Activities';

import SetContainer from './components/SetContainer';
import EventContainer from './components/EventContainer';
import ArtistTileContainer from './components/ArtistTileContainer';

import DMCA from './components/DMCA';
import Setmusic from './components/Setmusic';

var initialAppState = Immutable.Map({
	currentSet: {
		set_length: '00:00',
		starttime: '00:00',
		id: null
	},
	tracklist: [],
	currentTrack: null,
	sound: null,
	playerHidden: true,
	playing: false, //change to true once set starts playing
	timeElapsed: 0, //update while playing

	artistBrowseData: [],
	festivalBrowseData: [],
	mixBrowseData: [],
	activityBrowseData: [],
	recentBrowseData: [],
	popularBrowseData: [],
	landingEvents: [],

	isUserLoggedIn: false,
	user: {
		id: 108
	},
	newSets: [],
	newEvents: [],

	detailId: null,
	detailData: {
		"sets": [],
		"upcomingEvents": [],
		"links": {
			"facebook": null,
			"twitter": null,
			"instagram": null,
			"soundcloud": null,
			"youtube": null
		}
	},

	location: {
		label: 'DEFAULT LOCATION',
		location: {
			lat: 29.652175,
			lng: -82.325856
		}
	},

	searchResults: {
		artists: [],
		sets: [],
		upcomingEvents: [],
		tracks: []
	}
});

var evtHandler = GlobalEventHandler(initialAppState);
var evtTypes = evtHandler.types;

var push = evtHandler.push;

var App = React.createClass({
	displayName: 'App container',
	mixins: [History],

	getInitialState: function() {
		return {
			// Let's assume that other ephemeral state
			// MAY have to exist here.
			appState: initialAppState
		};
	},

	componentWillMount: function() {
		this._attachStreams();
	},

	componentDidMount: function() {
		loginService.startFacebookSDK(push);
	},

	_attachStreams: function() {
		var _this = this;
		evtHandler.floodGate.subscribe(newState => {
			_this.setState({ appState: newState });
		});
	},

	render: function() {
		var appState = this.state.appState;
		return (
			<div id='App' className='flex-column'>
				<Header appState={appState} push={push}/>
				{
					React.cloneElement(this.props.children, {
						appState: appState,
						push: push
					})
				}
				<Player appState={appState} push={push} />
			</div>
		);
	}
});

var routes = (
	<Route path='/' component={App}>
		<IndexRoute component={Setmusic}/>

		<Route path='play/:set' component={LandingView} />
		<Route path='user' component={HomeView}>
			<IndexRoute component={Favorites}/>
			<Route path='sets' component={NewSets}/>
			<Route path='events' component={NewEvents}/>
		</Route>

		<Route path='sets' component={SetsView}>
			<IndexRoute component={Recent}/>
			<Route path='mixes' component={Mixes}/>
			<Route path='popular' component={Popular}/>
			<Route path='festivals' component={Festivals}/>
			<Route path='activities' component={Activities}/>
		</Route>

		<Route path='events' component={EventsView}>
			<IndexRoute component={UpcomingEvents}/>
			<Route path='closest' component={ClosestEvents}/>
		</Route>

		<Route path='artists' component={Artists}/>
		<Route path='search' component={SearchResultsView}/>

		<Route path='artist/:artist' component={ArtistDetail}>
			<IndexRoute component={SetContainer}/>
			<Route path='events' component={EventContainer}/>
		</Route>
		<Route path='event/:event' component={EventDetail}/>
		<Route path='festival/:festival' component={FestivalDetail}/>
		<Route path='mix/:mix' component={MixDetail}/>
		<Route path='activity/:activity' component={ActivityDetail}/>
		<Route path='legal' component={DMCA} />

		// Redirects from Setmine v5.0
		<Redirect from='/browse/:artist/artist' to='/artist/:artist' />
		<Redirect from='/browse/:festival/festival' to='/festival/:festival' />
		<Redirect from='/browse/:mix/mix' to='/mix/:mix' />
		<Redirect from='/event/:eventID' to='/event/:eventID' />

	</Route>
);

var headMount = document.getElementById('head-mount-point');
var bodyMount = document.getElementById('body-mount-point');

import createBrowserHistory from 'history/lib/createBrowserHistory';
var history = createBrowserHistory();

React.render(
	<Router history={history}>
		{routes}
	</Router>
, bodyMount);

mixpanel.track("Page Load");
