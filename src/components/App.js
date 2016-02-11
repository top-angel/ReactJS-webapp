import React from 'react';
import Immutable from 'immutable';
import DocMeta from 'react-doc-meta';
import R from 'ramda';
import InjectTapEventPlugin from 'react-tap-event-plugin';

import GlobalEventHandler from '../services/globalEventHandler';
import {playSet, updatePlayCount} from '../services/playerService';
import {startFacebookSDK} from '../services/loginService';
import {getFavorites} from '../services/favoriteSet';
import detectMobileService from '../services/detectMobileService';
import {DEFAULT_IMAGE} from '../constants/constants';

// TODO move index.less from index.html to here

// fix mobile touch events not registering
InjectTapEventPlugin();

import Base from './Base';
import Header from './Header';
import NavBar from './NavBar';
import Player from './Player';
import Notifications from './Notifications';

let initialAppState = Immutable.Map({
	closestEvents: [],
	currentPage: 'Setmine',
	currentSet: {
		setLength: '00:00',
		starttime: '00:00',
		id: null
	},
	currentTrack: null,
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
	favorites: [],
	favoriteSetIds: [],
	loginStatus: true,
	playerHidden: true,
	playing: false,
	searchResults: {
		artists: [],
		sets: [],
		upcomingEvents: [],
		tracks: []
	},
	snackbar: {
		open: false,
		message: ''
	},
	sound: {
		durationEstimate: 0
	},
	timeElapsed: 0,
	tracklist: [],
	user: {
		id: 67,
		first_name: '',
		last_name: ''
	}
});

let tags = [
	{property: "description", content: "Setmine is a music app dedicated to live events! Relive past music festivals: Ultra, Coachella + more! Find upcoming shows + buy tix + listen to DJs' sets"},
	{property: "og:site_name", content: "Setmine"},
	{property: "fb:app_id", content: "648288801959503"},
	{property: "og:description", content: "Setmine offers live music enthusiasts a new way to experience their favorite festival music.  No more struggling to find your favorite sets--we've done it all for you.  Listen to Ultra, Coachella, TomorrowWorld, and many more! Also don't forget to listen your favorite DJ's radio shows!"},
	{property: "og:image", content: "https://setmine.com/images/setmine-logo-facebook.png"},
	{property: "og:title", content: "Setmine | View Lineups & Play Sets | Relive Your Favorite Events"},
	{property: "og:type", content: "website"},
	{name: "google-site-verification", content: "T4hZD9xTwig_RvyoXaV9XQDYw5ksKEQywRkqaW-CGY4"}
];

let evtHandler = GlobalEventHandler(initialAppState);
let evtTypes = evtHandler.types;
let pushFn = evtHandler.push;

// wrapper for pushFn. data must be an object
var push = data => pushFn({
	type: 'SHALLOW_MERGE',
	data: data
});

export default class App extends Base {
	constructor(props) {
		super(props);
		this.autoBind('initializeApp');
		this.state = {
			appState: initialAppState
		};
	}
	componentWillMount() {
		// initialize global appState and push fn
		this.initializeApp();

		// detect if user is on mobile web
		detectMobileService.detectMobileBrowser();

		// initialize Facebook SDK & check if user is logged in
		startFacebookSDK(push);

		// play set if specified in url
		if(!!this.props.params.set) {
			let setId = this.props.params.set;
			playSet(setId, push);
			updatePlayCount(setId, this.state.appState.get('user').id);
		}
	}
	componentWillUpdate(nextProps, nextState) {
		if(nextState.appState.get('playerHidden') === false) {
			return true;
		}
	}
	getChildContext() {
		return {
			push: push,
			user: this.state.appState.get('user'),
			loginStatus: this.state.appState.get('loginStatus'),
			favoriteSetIds: this.state.appState.get('favoriteSetIds')
		}
	}
	initializeApp() {
		let self = this;
		evtHandler.floodGate.subscribe(newState => {
			self.setState({ appState: newState });
		});
	}
	render() {
		let appState = this.state.appState;
		return (
			<div id='App'>
				<DocMeta tags={tags} />
				<Header currentPage={appState.get('currentPage')} />
				<NavBar />
				{
					React.cloneElement(this.props.children, {
						appState: appState
					})
				}
				<Notifications snackbar={appState.get('snackbar')} playerHidden={appState.get('playerHidden')} />
				<Player appState={appState} />
			</div>
		);
	}
}

App.childContextTypes = {
	push: React.PropTypes.func,
	user: React.PropTypes.object,
	loginStatus: React.PropTypes.bool,
	favoriteSetIds: React.PropTypes.array,
};