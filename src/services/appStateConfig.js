import {Map} from 'immutable';
import {DEFAULT_IMAGE} from '../constants/constants';

export default Map({
    closestEvents: [],
    currentPage: 'Setmine',
    currentSet: {
        artist: null,
        setName: null,
        event: null,
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
    loaded: false,
    loginStatus: false,
    playerHidden: true,
    playing: false,
    searchResults: {
        artists: [],
        sets: [],
        upcomingEvents: [],
        tracks: []
    },
    showLogin: false,
    showNavbar: true,
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