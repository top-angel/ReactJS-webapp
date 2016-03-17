import Q from 'q';
import R from 'ramda/dist/ramda.min';
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
// export function generateSound(starttime, appState, push) {
// 	var sound = appState.get('sound');
// 	var currentSet = appState.get('currentSet');
// 	starttime = MMSSToMilliseconds(starttime);

// 	if(sound != null) {
// 		soundManager.destroySound('currentSound');
// 	}

// 	var songUrl = S3_ROOT + currentSet.songUrl;

// 	var soundConfig = {
// 		id: 'currentSound',
// 		url: songUrl,
// 		load: starttime,
// 		onload: function() {
// 			var totalTime = sound.durationEstimate;
// 		},
// 		// volume: 0, //comment out for production
// 		whileplaying: function() {
// 			var currentTime = sound.position;
// 			// UPDATE CURRENT TRACK HERE
// 			var tracklist = appState.get('tracklist');
// 			var currentTrack = _.debounce(updateCurrentTrack(sound, tracklist, push), 1000);

// 			// count time
// 			_.debounce(push({
// 				timeElapsed: currentTime
// 			}), 1000)
// 		}
// 	};

// 	return smPromise.then(function() {
// 		sound = soundManager.createSound(soundConfig);
// 		sound.setPosition(starttime);
// 		soundManager.play('currentSound');
// 		return sound;
// 	});
// }

export function generateSound(appState, push) {
	let sound = appState.get('sound');
	if(sound != null) {
		soundManager.destroySound('currentSound');
	}

	const currentSet = appState.get('currentSet');
	const starttime = MMSSToMilliseconds(currentSet.starttime);
	const songUrl = S3_ROOT + currentSet.songUrl;

	const soundConfig = {
		id: 'currentSound',
		url: songUrl,
		load: starttime,
		whileplaying: function() {
			const currentTime = sound.position;
			// UPDATE CURRENT TRACK HERE
			const tracklist = appState.get('tracklist');
			const currentTrack = _.debounce(updateCurrentTrack(sound, tracklist, push), 1000);

			// count time
			_.debounce(push({
				timeElapsed: currentTime
			}), 1000)
		}
	};

	return smPromise.then(() => {
		sound = soundManager.createSound(soundConfig);
		sound.setPosition(starttime);
		soundManager.play('currentSound');
		return sound;
	});
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
			playing: true,
			playerHidden: false
		});
	})
}

// play/pause a set
export function togglePlay(sound) {
	if(sound.paused) {
		// console.log('playing')
		sound.play();
	} else {
		// console.log('paused')
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