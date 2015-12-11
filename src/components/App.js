import React from 'react';
import Immutable from 'immutable';
import DocMeta from 'react-doc-meta';

import GlobalEventHandler from '../services/globalEventHandler';
import {startFacebookSDK} from '../services/loginService';
import detectMobileService from '../services/detectMobileService';
import {API_ROOT} from '../constants/constants';

import Header from './Header';
import Player from './Player';

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
	playing: false,
	timeElapsed: 0,
	artistBrowseData: [],
	activityBrowseData: [],
	recentBrowseData: [],
	popularBrowseData: [],
	featuredEvents: [],
	upcomingEvents: [],
	closestEvents: [],
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
		"banner_image": {
			imageURL: ''
		},
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

	getInitialState() {
		return {
			// Let's assume that other ephemeral state
			// MAY have to exist here.
			appState: initialAppState
		};
	},

	componentWillMount() {
		this.initializeApp();
		detectMobileService.detectMobileBrowser();
		if(!!this.props.params.set) {
			this.playSet();
		}
	},

	componentDidMount() {
		var metadataPath = window.location.pathname;
		startFacebookSDK(push);

		// check if user is logged in
		console.log(this.state.appState.get('isUserLoggedIn'));
	},

	initializeApp() {
		var self = this;
		evtHandler.floodGate.subscribe(newState => {
			self.setState({ appState: newState });
		});
	},

	playSet() {
		var id = this.props.params.set;
		var self = this;

		this.getSetById(id).done(res => {
			if(res.status === 'success') {
				var set = res.payload.sets_id;
				var tracks = set.tracks;
				var artists = R.pluck('artist', set.artists);
				var artist = artists.toString().split(',').join(', ');

				var currentSet = {
					artist: artist,
					event: set.event.event,
					id: set.id,
					set_length: set.set_length,
					songURL: set.songURL,
					artistimageURL: set.icon_image.imageURL,
					starttime: '00:00'
				};

				push({
					type: 'SHALLOW_MERGE',
					data: {
						currentSet: currentSet,
						tracklist: tracks,
						currentTrack: tracks[1].trackname,
						playing: true
					}
				});
			}
		});
	},

	getSetById(id) {
		return (
			$.ajax({
				type: 'get',
				url: `${API_ROOT}sets/id/${id}`
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

export default App;