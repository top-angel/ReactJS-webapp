import React from 'react';
import Immutable from 'immutable';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import GlobalEventHandler from './services/globalEventHandler';

import SM2 from 'soundmanager2';
var soundManager = SM2.soundManager;

import Footer from './components/Footer';
import Header from './components/Header';
import PlayerWrapper from './components/Player';
import DetailView from './components/DetailView';
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

var initialAppState = Immutable.Map({
//THIS IS WHERE SOUND COMES FROM 
	currentSet: {
		artist: 'FlicFlac',
		event: 'Best of FlicFlac 2014',
		artistimageURL: '367430a23a7d0da81b8222191fcb2034.jpg',
		songURL: '6fdbe5fe2c23c40fbae8d03f40921ddd7d9b5af3.mp3',
		set_length: '38:10',
		starttime: '00:05',// <- MUST BE IN THIS FORMAT
		id: 3684
	},
	tracklist: [
		{
			"trackname": "Vance Joy - Riptide (FlicFlac Edit)",
			"artistname": "Vance Joy",
			"songname": "Riptide (FlicFlac Edit)",
			"starttime": "00:00",
			"set_length": "38:10"
		},
		{
			"trackname": "Milky Chance - Down by the River (FlicFlac Edit)",
			"artistname": "Milky Chance",
			"songname": "Down by the River (FlicFlac Edit)",
			"starttime": "05:52",
			"set_length": "38:10"
		},
		{
			"trackname": "The Lumineers - Stubborn Love (FlicFlac Bootleg) ",
			"artistname": "The Lumineers",
			"songname": "Stubborn Love (FlicFlac Bootleg) ",
			"starttime": "10:47",
			"set_length": "38:10"
		},
		{
			"trackname": "Empire of the Suns - We are the People (FlicFlac Remix)",
			"artistname": "Empire of the Suns",
			"songname": "We are the People (FlicFlac Remix)",
			"starttime": "16:44",
			"set_length": "38:10"
		},
		{
			"trackname": "Milky Chance - Stolen Dance (FlicFlac Edit)",
			"artistname": "Milky Chance",
			"songname": "Stolen Dance (FlicFlac Edit)",
			"starttime": "24:14",
			"set_length": "38:10"
		},
		{
			"trackname": "Edward Sharpe & The Magnetic Zeros - Home (FlicFlac Remix)",
			"artistname": "Edward Sharpe & The Magnetic Zeros",
			"songname": "Home (FlicFlac Remix)",
			"starttime": "29:23",
			"set_length": "38:10"
		},
		{
			"trackname": "Lykke Li - I follow Rivers (FlicFlac Remix)",
			"artistname": "Lykke Li",
			"songname": "I follow Rivers (FlicFlac Remix)",
			"starttime": "33:53",
			"set_length": "38:10"
		}
	],
	currentTrack: 'Vance Joy - Riptide (FlicFlac Edit)',
	sound: null, // <- soungmanager object
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
	userId: 108,
	user: {},
	favorites: [],
	newSets: [],
	newEvents: [],

	detailId: 2,// change to 1685 for testing upcoming event
	detailData: {//minimum properties needed for rendering
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
	},

	// artistRoute: null,
	// eventRoute: null,
	// festivalRoute: null,
	// mixRoute: null,
	// activityRoute: null,
	// playRoute: null
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
	getInitialState: function() {
		return {
			// Let's assume that other ephemeral state
			// MAY have to exist here.
			appState: initialAppState
		};
	},

//TODO change this back to cdm if anything fucks up in the future
//WHY? this removes one render per page load
	componentDidMount: function() {
		//from path /play/:id
		// var id = this.props.params.id;
		// fetchMessage(id, function(err, message) {
		// 	this.setState({
		// 		message: message 
		// 	});
		// })
	},

	componentWillMount: function() {
		// this._attachStreams();
		var _this = this;
		soundManager.setup({
				url: '/swf/soundmanager2.swf',
				onready: function() {
					_this._attachStreams();
					console.log('SM2 LOADED BRUH');
				},
				ontimeout: function() {
					console.log('Error loading SoundManager2');
				}
			});
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
		//pass in appState and push to every component you want to access event dispatcher
		return (
			<div id='App' className='flex-column'>
				<Header appState={appState} push={push}/>
				<PlayerWrapper appState={appState}
					push={push}
					routeHandler={RouteHandler}/>
				<Footer />
			</div>
		);
	}
});

var routes = (
	<Route path='/' handler={App}>
		<Route name='test' path='sandbox' handler={Sandbox}/>
		<DefaultRoute name='landing' handler={LandingView}/>

		<Route name='user' path='user' handler={HomeView}>
			<DefaultRoute name='user-favorites' handler={Favorites}/>
			<Route name='user-sets' path='sets' handler={NewSets}/>
			<Route name='user-events' path='events' handler={NewEvents}/>
		</Route>

		<Route name='sets' path='sets' handler={SetsView}>
			<DefaultRoute name='recent' handler={Recent}/>
			<Route name='mixes' path='mixes' handler={Mixes}/>
			<Route name='popular' path='popular' handler={Popular}/>
			<Route name='festivals' path='festivals' handler={Festivals}/>
			<Route name='activities' path='activities' handler={Activities}/>
		</Route>

		<Route name='events' path='events' handler={EventsView}>
			<DefaultRoute name='upcoming' handler={UpcomingEvents}/>
			<Route name='closest' handler={ClosestEvents}/>
		</Route>

		<Route name='artists' path='artists' handler={Artists}/>
		<Route name='search' path='search' handler={SearchResultsView}/>

		<Route name='artist' path='artist' handler={ArtistDetail}>
			<DefaultRoute name='artist-sets' handler={SetContainer}/>
			<Route name='artist-events' path='events' handler={EventContainer}/>
		</Route>

		<Route name='festival' path='festival' handler={FestivalDetail}>
			<DefaultRoute name='festival-sets' handler={SetContainer}/>
		</Route>

		<Route name='event' path='event' handler={EventDetail}>
			<DefaultRoute name='event-lineup' handler={ArtistTileContainer}/>
		</Route>

		<Route name='mix' path='mix' handler={MixDetail}>
			<DefaultRoute name='mix-sets' handler={SetContainer}/>
		</Route>

		<Route name='activity' path='activity' handler={ActivityDetail}>
			<DefaultRoute name='activity-sets' handler={SetContainer}/>
		</Route>
	</Route>
);

// <Route name='dmca' path='dmca-notice' handler={DMCA}/>
// 		<Route name='contact' path='contact' handler={Contact}/>

module.exports = routes;

var headMount = document.getElementById('head-mount-point');
var bodyMount = document.getElementById('body-mount-point');

Router.run(routes, Router.HashLocation, function(Root) {
	React.render(<Root/>, bodyMount);
});