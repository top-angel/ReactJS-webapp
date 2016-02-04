import Q from 'q';
import R from 'ramda';
import SM2 from 'soundmanager2';
import _ from 'underscore';

import api from './api';
import {MMSSToMilliseconds} from './convert';
import {S3_ROOT, API_ROOT} from '../constants/constants';

var soundManager = SM2.soundManager;

// This will resolve when soundManager loads
var smDeferred = Q.defer();
var smPromise = smDeferred.promise;

soundManager.setup({
	url: '/swf/soundmanager2.swf',
	debugMode: false,
	onready: function() {
		console.log('SM2 loaded');
		smDeferred.resolve();
	},
	ontimeout: function() {
		console.log('Error loading SoundManager2');
	}
});

//change track by selecting from tracklist
export function changeTrack(appState, push, starttime, currentTrack) {
	var sound = appState.get('sound');
	sound.setPosition(starttime);
	push({
		currentTrack: currentTrack,
		timeElapsed: starttime
	})
}

// create SoundManager sound object from a set
export function generateSound(loadStart, appState, push) {
	var sound = appState.get('sound');
	var currentSet = appState.get('currentSet');
	loadStart = MMSSToMilliseconds(loadStart);

	//// XXX TODO MOVE THIS
	if(sound != null) {
		soundManager.destroySound('currentSound');
	}

	var songUrl = S3_ROOT + currentSet.songUrl;

	var soundConfig = {
		id: 'currentSound',
		url: songUrl,
		load: loadStart,
		onload: function() {
			var totalTime = sound.durationEstimate;
		},
		// volume: 0, //comment out for production
		whileplaying: function() {
			var currentTime = sound.position;
			// UPDATE CURRENT TRACK HERE
			var tracklist = appState.get('tracklist');
			var currentTrack = _.debounce(updateCurrentTrack(sound, tracklist, push), 1000);

			// count time
			_.debounce(push({
				timeElapsed: currentTime
			}), 1000)
		}
	};

	return smPromise.then(function() {
		sound = soundManager.createSound(soundConfig);
		sound.setPosition(loadStart);
		soundManager.play('currentSound');
		return sound;
	});
}

export function mixpanelTrackSetPlay(set) {
	// Log Mixpanel event
	var setName = set.artist+' - '+set.event;

	mixpanel.track("Set Play", {
		"set_id": set.id,
		"set_name": setName,
		"set_artist": set.artist,
		"set_event": set.event
	});

	// mixpanel user tracking
	mixpanel.people.increment("play_count");
	mixpanel.people.append("sets_played_ids", set.set_id);
	mixpanel.people.append("sets_played_names", setName);
	mixpanel.people.append("sets_played_artists", set.artist);
	mixpanel.people.append("sets_played_events", set.event);
}

// fetch set by id and play set
export function playSet(setId, push, starttime = '00:00') {
	api.get(`sets/id/${setId}`).then(res => {
		var set = res.sets_id
		var tracks = set.tracks

		var setName = (set.episode.episode && set.episode.episode.length > 0) ? `${set.event.event} - ${set.episode.episode}` : set.event.event

		// format artists for multiple artists
		var artist = R.pluck('artist', set.artists).toString().split(',').join(', ')

		push({
			currentSet: {
				artist: artist,
				event: set.event.event,
				setName: setName,
				id: set.id,
				setLength: set.set_length,
				songUrl: set.songURL,
				artistImage: set.artists[0].icon_image.imageURL,
				starttime: starttime,
			},
			tracklist: tracks,
			currentTrack: tracks[0].trackname,
			playing: true
		})
	})
}

//scrub to a new position after clicking progress bar
export function scrub(position, appState, push) {
	var sound = appState.get('sound');
	var timeElapsed = appState.get('timeElapsed');

	var setLength = sound.durationEstimate;
	var newPosition = (position * setLength) / 100;

	push({ timeElapsed: newPosition })

	// SHEEEEIT DAS IT MAYNE
	_.debounce(sound.setPosition(newPosition), 10000)
	// setTimeout(sound.setPosition(newPosition), 5000)
}

// play/pause a set
export function togglePlay(sound) {
	if(sound.paused) {
		console.log('playing')
		sound.play();
	} else {
		console.log('paused')
		sound.pause();
	}
}

// updates set play count in database
export function updatePlayCount(setId, userId) {
	api.post('sets/play', {
		set_id: setId,
		user_id: userId
	}).then(res => {
		console.log('play count updated')
	})
}

// automatically updates tracklist while playing
export function updateCurrentTrack(sound, tracklist, push) {
	var currentPosition = sound.position;

	var currentTrack = tracklist.filter((track, index) => {
		var starttime = MMSSToMilliseconds(track.starttime);

		if(starttime <= currentPosition) {
			var playing = track.trackname;
		}
		return playing;
	});

	push({ currentTrack: R.last(currentTrack).trackname })
}