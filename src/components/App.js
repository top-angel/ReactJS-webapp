import React from 'react';
import Immutable from 'immutable';
import DocMeta from 'react-doc-meta';
import R from 'ramda';

import GlobalEventHandler from '../services/globalEventHandler';
import {playSet, updatePlayCount} from '../services/playerService';
import {startFacebookSDK} from '../services/loginService';
import detectMobileService from '../services/detectMobileService';
import {API_ROOT, DEFAULT_IMAGE} from '../constants/constants';

import Header from './Header';
import Player from './Player';

var initialAppState = Immutable.Map({
	currentSet: {
		setLength: '00:00',
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
		banner_image: {
			imageURL: DEFAULT_IMAGE
		},
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
		push: React.PropTypes.func,
		user: React.PropTypes.object,
		loginStatus: React.PropTypes.bool
	},

	getChildContext() {
		return {
			push: push,
			user: this.state.appState.get('user'),
			loginStatus: this.state.appState.get('isUserLoggedIn')
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
			// this.playSet();
			var setId = this.props.params.set;
			playSet(setId, push)
			updatePlayCount(setId, this.state.appState.get('user').id)
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

	showPlayer() {
		if(this.state.appState.get('sound') != null) {
			return <Player appState={this.state.appState}/>
		} else {
			return
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
				<Header appState={appState} />
				{
					React.cloneElement(this.props.children, {
						appState: appState
					})
				}
				{/*<Player appState={appState} />*/}
				{this.showPlayer()}
			</div>
		);
	}
});

export default App;