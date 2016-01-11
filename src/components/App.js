import React from 'react';
import Immutable from 'immutable';
import DocMeta from 'react-doc-meta';

import GlobalEventHandler from '../services/globalEventHandler';
import {startFacebookSDK} from '../services/loginService';
import detectMobileService from '../services/detectMobileService';
import {API_ROOT, DEFAULT_IMAGE} from '../constants/constants';

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

	closestEvents: [],
	isUserLoggedIn: false,
	user: {
		id: 67
	},
	favorites: [],
	detailData: {
		sets: [],
		upcomingEvents: [],
		icon_image: {
			imageURL: DEFAULT_IMAGE
		},
		fb_link: null,
		twitter_link: null,
		instagram_link: null,
		soundcloud_link: null,
		youtube_link: null
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

const App = React.createClass({

	childContextTypes: {
		push: React.PropTypes.func
	},

	getChildContext() {
		return {
			push: push
		}
	},

	getInitialState() {
		return {
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
		startFacebookSDK(push);
		// check if user is logged in
		console.log('user logged in: ' + this.state.appState.get('isUserLoggedIn'));
	},

	initializeApp() {
		var self = this;
		evtHandler.floodGate.subscribe(newState => {
			self.setState({ appState: newState });
		});
	},

	playSet() {
		var setId = this.props.params.set;
		this.getSetById(setId).done(res => {
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
		return $.ajax({
			type: 'get',
			url: `${API_ROOT}sets/id/${id}`
		})
	},

	renderPlayer() {
		// if(!this.state.appState.get('playerHidden')) {
		// 	return <Player appState={this.state.appState} push={push} />
		// } else {
		// 	return ''
		// }
		if(this.state.appState.get('sound') != null) {
			return <Player appState={this.state.appState} push={push} />
		} else {
			return ''
		}
	},

	render() {
		var appState = this.state.appState;
		var tags = [
			{property: "description", content: "Setmine is a music app dedicated to live events! Relive past music festivals: Ultra, Coachella + more! Find upcoming shows + buy tix + listen to DJs' sets"},
			{property: "og:site_name", content: "Setmine"},
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