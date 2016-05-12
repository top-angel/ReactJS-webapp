import React, {PropTypes} from 'react';
import DocMeta from 'react-doc-meta';
import InjectTapEventPlugin from 'react-tap-event-plugin';

import initialAppState from '../services/appStateConfig';
import GlobalEventHandler from '../services/globalEventHandler';
import {playSet, updatePlayCount} from '../services/playerService';
import {startFacebookSDK} from '../services/loginService';
import {getFavorites} from '../services/favoriteSet';
import detectMobileService from '../services/detectMobileService';
import {trackSetPlay} from '../services/mixpanelService';

// fix mobile touch events not registering
InjectTapEventPlugin();

import Base from './Base';
import Header from './Header';
import NavBar from './NavBar';
import Player from './Player';
import Notifications from './Notifications';
import LoginOverlay from './LoginOverlay';
import Loader from './Loader';

const tags = [
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
const push = data => pushFn({
    type: evtTypes.SHALLOW_MERGE,
    data: data
});

const isProduction = process.env.NODE_ENV === 'production';

export default class App extends Base {
    static contextTypes = {
        router: PropTypes.object
    }
    static childContextTypes = {
        push: PropTypes.func,
        user: PropTypes.object,
        loginStatus: PropTypes.bool,
        favoriteSetIds: PropTypes.array
    }
    constructor(props) {
        super(props);
        this.autoBind('initializeApp');
        this.state = {
            appState: initialAppState
        };
    }
    getChildContext() {
        return {
            push: push,
            user: this.state.appState.get('user'),
            loginStatus: this.state.appState.get('loginStatus'),
            favoriteSetIds: this.state.appState.get('favoriteSetIds')
        }
    }
    componentWillMount() {
        const {appState} = this.state;
        const {router} = this.context;
        // initialize global appState and push fn
        this.initializeApp();

        // detect if user is on mobile web
        detectMobileService.detectMobileBrowser();

        // temporary workaround
        if(!isProduction) {
            push({ loaded: true });
        }

        // initialize Facebook SDK & check if user is logged in
        startFacebookSDK(push, router, this.props.location.pathname);

        // play set if specified in url
        if(!!this.props.params.set) {
            let setId = this.props.params.set;
            let currentSet = appState.get('currentSet');

            playSet(setId, push);
            updatePlayCount(setId, appState.get('user').id);
            trackSetPlay(currentSet);
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if(nextState.appState.get('playerHidden') === false) {
            return true;
        }
        if(nextState.appState.get('loginStatus')) {
            return true;
        }
        return true;
    }
    initializeApp() {
        evtHandler.floodGate.subscribe(newState => {
            this.setState({ appState: newState });
        });
    }
    render() {
        let appState = this.state.appState;
        let playerHidden = appState.get('playerHidden');
        let currentPage = appState.get('currentPage');
        let snackbar = appState.get('snackbar');
        let showLogin = appState.get('showLogin');
        let showNavbar = appState.get('showNavbar');
        let pageWidth = ((window.innerWidth - 64) / window.innerWidth) * 100 + '%';

        return (
            <Loader loaded={appState.get('loaded')}>
                <div id='App' className='flex-column'>
                    <DocMeta tags={tags} />
                    <Header currentPage={currentPage} showLogin={showLogin} location={this.props.location}/>
                    {showNavbar && <NavBar />}
                    {
                        React.cloneElement(this.props.children, {
                            appState: appState
                        })
                    }
                    <Notifications snackbar={snackbar} playerHidden={playerHidden} />
                    <LoginOverlay open={showLogin} />
                    {!playerHidden && <Player appState={appState} />}
                </div>
            </Loader>
        );
    }
}