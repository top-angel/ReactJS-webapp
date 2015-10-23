import React from 'react';
import Immutable from 'immutable';
import Router from 'react-router';
import DocMeta from 'react-doc-meta';
import R from 'ramda';

import { IndexRoute, Link, Route, History, Redirect } from 'react-router';
import GlobalEventHandler from './services/globalEventHandler';
import loginService from './services/loginService';
import detectMobileService from './services/detectMobileService';
import constants from './constants/constants';

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

import SetstoryLandingPage from './components/SetstoryLandingPage';

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

	getInitialState() {
		return {
			// Let's assume that other ephemeral state
			// MAY have to exist here.
			appState: initialAppState
		};
	},

	componentWillMount() {
		this._attachStreams();
		detectMobileService.detectMobileBrowser();
		this.playSet();
	},

	componentDidMount() {
		var metadataPath = window.location.pathname;
		loginService.startFacebookSDK(push);
	},

	_attachStreams() {
		var self = this;
		evtHandler.floodGate.subscribe(newState => {
			self.setState({ appState: newState });
		});
	},

	playSet() {
		var id = this.props.params.set;
		var self = this;

		if(!!id) {
			this.getSetById(id)
				.done(function(res) {
					var set = R.head(res.payload.set);
					var currentSet = {
						artist: set.artist,
						event: set.event,
						id: set.id,
						set_length: set.set_length,
						songURL: set.songURL,
						artistimageURL: set.artistimageURL,
						starttime: '00:00'
					};

					self.getTracklist(id)
					.done(function(res) {
						console.log(res.payload.tracks);
						var tracklist = res.payload.tracks;

						push({
							type: 'SHALLOW_MERGE',
							data: {
								currentSet: currentSet,
								tracklist: tracklist,
								currentTrack: R.head(res.payload.tracklist),
								playing: true
							}
						});
					});
			});
		}
	},

	getSetById(id) {
		return (
			$.ajax({
				type: 'get',
				url: constants.API_ROOT + 'set/id',
				data: {
					'setId': [id]
				}
			})
		);
	},

	getTracklist(id) {
		return (
			$.ajax({
				url: constants.API_ROOT + 'tracklist/' + id,
				type: 'get'
			})
		);
	},

	render() {
		var appState = this.state.appState;
		var tags = [
			{property: "description", content: "Setmine is a music app dedicated to live events! Relive past music festivals: Ultra, Coachella + more! Find upcoming shows + buy tix + listen to DJs' sets"},
			{property: "og:site_name", content: "Setmine"},
			// {property: "og:url", content: "https://setmine.com/metadata/" + encodeURIComponent(metadataPath.substring(1))},
			{property: "fb:app_id", content: "648288801959503"},
			{property: "og:description", content: "Setmine offers live music enthusiasts a new way to experience their favorite festival music.  No more struggling to find your favorite sets--we've done it all for you.  Listen to Ultra, Coachella, TomorrowWorld, and many more! Also don't forget to listen your favorite DJ's radio shows!"},
			{property: "og:image", content: "https://setmine.com/images/setmine-logo-facebook.png"},
			{property: "og:title", content: "Setmine | View Lineups & Play Sets | Relive Your Favorite Events"},
			{property: "og:type", content: "website"},
			{name: "google-site-verification", content: "T4hZD9xTwig_RvyoXaV9XQDYw5ksKEQywRkqaW-CGY4"}
		];
		
		return (
			<div id='App' className='flex-column'>
				<DocMeta tags={tags} />

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
		<IndexRoute component={LandingView}/>

		<Route path='play/:set' component={SetsView}>
			<IndexRoute component={Recent}/>
			<Route path='mixes' component={Mixes}/>
			<Route path='popular' component={Popular}/>
			<Route path='festivals' component={Festivals}/>
			<Route path='activities' component={Activities}/>
		</Route>

		<Route path='sets' component={SetsView}>
			<IndexRoute component={Recent}/>
			<Route path='mixes' component={Mixes}/>
			<Route path='popular' component={Popular}/>
			<Route path='festivals' component={Festivals}/>
			<Route path='activities' component={Activities}/>
		</Route>

		<Route path='user' component={HomeView}>
			<IndexRoute component={Favorites}/>
			<Route path='sets' component={NewSets}/>
			<Route path='events' component={NewEvents}/>
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

		// Setmusic About
		<Route path='about' component={Setmusic}/>
	</Route>
);

var headMount = document.getElementById('head-mount-point');
var bodyMount = document.getElementById('body-mount-point');

import createBrowserHistory from 'history/lib/createBrowserHistory';
var history = createBrowserHistory();

React.render(
	<Router>
		{routes}
	</Router>
, bodyMount);

mixpanel.track("Page Load");
