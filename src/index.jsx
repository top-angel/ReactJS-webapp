import React from 'react';
import Immutable from 'immutable';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import GlobalEventHandler from './services/globalEventHandler';

import mui from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
var ThemeManager = new mui.Styles.ThemeManager();

import Footer from './components/Footer';
import Header from './components/Header';
import PlayerWrapper from './components/Player';
import DetailView from './components/DetailView';
import LandingView from './components/LandingView';
import FeaturedView from './components/FeaturedView';
import HomeView from './components/HomeView';
import SetsView from './components/SetsView';
import SearchResultsView from './components/SearchResultsView';

import ArtistDetail from './components/ArtistDetail';
import FestivalDetail from './components/FestivalDetail';
import ActivityDetail from './components/ActivityDetail';

// import EventDetail from './components/EventDetail';

import Favorites from './components/Favorites';
import NewSets from './components/NewSets';
import NewEvents from './components/NewEvents';

import Artists from './components/Artists';
import Festivals from './components/Festivals';
import Mixes from './components/Mixes';
import Activities from './components/Activities';

import SetContainer from './components/SetContainer';
import EventContainer from './components/EventContainer';
// import BrowseContainer from './components/BrowseContainer';

var initialAppState = Immutable.Map({
	setSMObject: null,
	currentSet: {
		selectedSet: {
			id: 1903,
			artist_id: [
				574
			],
			artist: 'Kygo',
			event: 'Tomorrowland 2014 W2',
			event_id: 116,
			episode: '',
			genre: 'Progressive House',
			episode_imageURL: null,
			eventimageURL: 'dbd5bd7900531575c9bbfaba0ae434c4.jpg',
			main_eventimageURL: '12141ddad8636c5804c86dc685550ee1.jpg',
			artistimageURL: 'a7f7aaec8ecd0cdec444b8abb06dbc66.jpg',
			songURL: '8bf16c6bb2609bcbb7a00940d65038a9e992c98b.mp3',
			datetime: '2014-07-28T19:53:38.000Z',
			popularity: 1017,
			is_radiomix: 0,
			set_length: '10:32',
			tracklistURL: null,
			imageURL: 'dbd5bd7900531575c9bbfaba0ae434c4.jpg',
			artist_preview: [
				{
					id: 574,
					artist: 'Kygo',
					imageURL: 'a7f7aaec8ecd0cdec444b8abb06dbc66.jpg',
					set_count: 6,
					event_count: 0
				}
			],
			model_type: 'set'
		},
		isPlaying: false,
		timePosition: 0
	},

	artistBrowseData: [],
	festivalBrowseData: [],
	mixBrowseData: [],
	activityBrowseData: [],

	allLanding: [],
	landingData: [],
	activeLanding: [],
	upcomingEventData: [],

	mySets: [],
	userData: {
		isUserLoggedIn: false,
		user: {}
	},

	detailId: 347,//TODO clean up if possible
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
		city: 'Dania Beach',
		state: 'FL'
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
		//pass in appState and push to every component you want to access event dispatcher
		return (
			<div className="main-container flex-column">
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
		<DefaultRoute name='landing' handler={LandingView}/>
		<Route name='user' path='user' handler={HomeView}>
			<DefaultRoute name='user-favorites' handler={Favorites}/>
			<Route name='user-new-sets' path='sets' handler={NewSets}/>
			<Route name='user-new-events' path='events' handler={NewEvents}/>
		</Route>
		<Route name='sets' path='sets' handler={SetsView}>
			<Route name='mixes' path='mixes' handler={Mixes}/>
			<Route name='festivals' path='festivals' handler={Festivals}/>
			<Route name='activities' path='activities' handler={Activities}/>
		</Route>
		<Route name='events' path='events' handler={FeaturedView}/>
		<Route name='artists' path='artists' handler={Artists}/>
		<Route name='search' path='search' handler={SearchResultsView}/>
		<Route name='artist' path='artist' handler={ArtistDetail}>
			{/*TODO add routes for sets & events*/}
		</Route>
		<Route name='festival' path='festival' handler={FestivalDetail}/>
		<Route name='activity' path='activity' handler={ActivityDetail}/>
	</Route>
);


var headMount = document.getElementById('head-mount-point');
var bodyMount = document.getElementById('body-mount-point');

Router.run(routes, Router.HashLocation, function(Root) {
	React.render(<Root/>, bodyMount);
});
