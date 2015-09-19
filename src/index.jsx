import React from 'react';
import Immutable from 'immutable';
import Router from 'react-router';
import { IndexRoute, Link, Route, History } from 'react-router';
import GlobalEventHandler from './services/globalEventHandler';

import Footer from './components/Footer';
import Header from './components/Header';
import Player from './components/Player';
import LandingView from './components/LandingView';
import EventsView from './components/EventsView';
import HomeView from './components/HomeView';
import SetsView from './components/SetsView';
import SearchResultsView from './components/SearchResultsView';
import Sandbox from './components/Sandbox';

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

var initialAppState = Immutable.Map({
//TEST SET
	// currentSet: {
	// 	artist: 'FlicFlac',
	// 	event: 'Best of FlicFlac 2014',
	// 	artistimageURL: '367430a23a7d0da81b8222191fcb2034.jpg',
	// 	songURL: '6fdbe5fe2c23c40fbae8d03f40921ddd7d9b5af3.mp3',
	// 	set_length: '38:10',
	// 	starttime: '00:00',// <- MUST BE IN THIS FORMAT
	// 	id: 3684
	// },
	// tracklist: [
	// 	{
	// 		"trackname": "Vance Joy - Riptide (FlicFlac Edit)",
	// 		"artistname": "Vance Joy",
	// 		"songname": "Riptide (FlicFlac Edit)",
	// 		"starttime": "00:00",
	// 		"set_length": "38:10"
	// 	},
	// 	{
	// 		"trackname": "Milky Chance - Down by the River (FlicFlac Edit)",
	// 		"artistname": "Milky Chance",
	// 		"songname": "Down by the River (FlicFlac Edit)",
	// 		"starttime": "05:52",
	// 		"set_length": "38:10"
	// 	},
	// 	{
	// 		"trackname": "The Lumineers - Stubborn Love (FlicFlac Bootleg) ",
	// 		"artistname": "The Lumineers",
	// 		"songname": "Stubborn Love (FlicFlac Bootleg) ",
	// 		"starttime": "10:47",
	// 		"set_length": "38:10"
	// 	},
	// 	{
	// 		"trackname": "Empire of the Suns - We are the People (FlicFlac Remix)",
	// 		"artistname": "Empire of the Suns",
	// 		"songname": "We are the People (FlicFlac Remix)",
	// 		"starttime": "16:44",
	// 		"set_length": "38:10"
	// 	},
	// 	{
	// 		"trackname": "Milky Chance - Stolen Dance (FlicFlac Edit)",
	// 		"artistname": "Milky Chance",
	// 		"songname": "Stolen Dance (FlicFlac Edit)",
	// 		"starttime": "24:14",
	// 		"set_length": "38:10"
	// 	},
	// 	{
	// 		"trackname": "Edward Sharpe & The Magnetic Zeros - Home (FlicFlac Remix)",
	// 		"artistname": "Edward Sharpe & The Magnetic Zeros",
	// 		"songname": "Home (FlicFlac Remix)",
	// 		"starttime": "29:23",
	// 		"set_length": "38:10"
	// 	},
	// 	{
	// 		"trackname": "Lykke Li - I follow Rivers (FlicFlac Remix)",
	// 		"artistname": "Lykke Li",
	// 		"songname": "I follow Rivers (FlicFlac Remix)",
	// 		"starttime": "33:53",
	// 		"set_length": "38:10"
	// 	}
	// ],

	currentSet: {
		set_length: '00:00',
		starttime: '00:00',
		id: null
	},
	tracklist: [],
	currentTrack: null,
	sound: null, // <- soungmanager object
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
	mixins: [History],

	getInitialState: function() {
		return {
			// Let's assume that other ephemeral state
			// MAY have to exist here.
			appState: initialAppState
		};
	},

	componentDidMount: function() {
		//find a better way to do this
		// var _this = this;
		// $(window).keypress(function(e) {
		// 	console.log(e.char);
		// 	_this.history.pushState(null, '/search');
		// });
	},

	componentWillMount: function() {
		this._attachStreams();
	},

	_attachStreams: function() {
		var _this = this;
		evtHandler.floodGate.subscribe(newState => {
			// console.log('UPDATE', newState); //hiding to clear consoles
			_this.setState({ appState: newState });
		});
	},

	render: function() {
		var appState = this.state.appState;
		//pass in appState and push to every component you want to access event dispatcher
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
		<Route path='sandbox/:id' component={Sandbox}/>
		<IndexRoute component={LandingView}/>

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
