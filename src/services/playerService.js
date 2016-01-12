import Q from 'q';
import R from 'ramda';
import SM2 from 'soundmanager2';
import _ from 'underscore';

import convert from './convert';
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
		type: 'SHALLOW_MERGE',
		data: {
			currentTrack: currentTrack,
			timeElapsed: starttime
		}
	});
}

function errorPromise(jqXHR, textStatus, errorThrown) {
	console.log('ERROR MAKING AJAX CALL', jqXHR, textStatus, errorThrown);
	return  Q.reject(errorThrown);
}

// create SoundManager sound object from a set
export function generateSound(loadStart, appState, push) {
	var sound = appState.get('sound');
	var currentSet = appState.get('currentSet');
	loadStart = convert.MMSSToMilliseconds(loadStart);

	//// XXX TODO MOVE THIS
	if(sound != null) {
		soundManager.destroySound('currentSound');
	}

	var songUrl = S3_ROOT + currentSet.songUrl;

	var soundConf = {
		id: 'currentSound',
		url: songUrl,
		load: loadStart,
		onload: function() {
			var totalTime = sound.durationEstimate;
		},
		volume: 0, //comment out for production
		whileplaying: function() {
			var currentTime = sound.position;
			// UPDATE CURRENT TRACK HERE
			var tracklist = appState.get('tracklist');
			// var currentTrack = updateCurrentTrack(sound, tracklist, push);
			var currentTrack = _.debounce(updateCurrentTrack(sound, tracklist, push), 1000);

			_.debounce(push({
				type: 'SHALLOW_MERGE',
				data: {
					timeElapsed: currentTime
				}
			}), 1000);
		}
	};

	return smPromise.then(function() {
		sound = soundManager.createSound(soundConf);
		sound.setPosition(loadStart);
		soundManager.play('currentSound');
		return sound;
	});
}

function getSetById(id) {
	return $.ajax({
		type: 'get',
		url: `${API_ROOT}sets/id/${id}`
	})
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

export function playSet(setId, push, starttime = '00:00') {
	getSetById(setId).done(res => {
		if(res.status === 'success') {
			var set = res.payload.sets_id;
			var tracks = set.tracks;

			// format artists string for multiple artists
			var artist = R.pluck('artist', set.artists).toString().split(',').join(', ')

			push({
				type: 'SHALLOW_MERGE',
				data: {
					currentSet: {
						artist: artist,
						event: set.event.event,
						id: set.id,
						setLength: set.set_length,
						songUrl: set.songURL,
						artistImage: set.artists[0].icon_image.imageURL,
						starttime: starttime,
					},
					tracklist: tracks,
					currentTrack: tracks[0].trackname,
					playing: true
				}
			})
		}
	})
}

//scrub to a new position after clicking progress bar
export function scrub(position, appState, push) {
	var sound = appState.get('sound');
	var currentSet = appState.get('currentSet');
	var timeElapsed = appState.get('timeElapsed');

	var set_length = sound.durationEstimate;
	var multiplier = position / 100;// 70 -> 0.7
	var newPosition = multiplier * set_length;

	sound.setPosition(newPosition);

	push({
		type: 'SHALLOW_MERGE',
		data: {
			timeElapsed: newPosition
		}
	});
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
	$.ajax({
		type: 'post',
		url: `${API_ROOT}sets/play`,
		data: {
			set_id: setId,
			user_id: userId || null
		},
		success(data) {
			console.log('play count updated')
		}
	})
}

// automatically updates tracklist while playing
export function updateCurrentTrack(sound, tracklist, push) {
	var currentPosition = sound.position;

	var currentTrack = tracklist.filter((track, index) => {
		var starttime = convert.MMSSToMilliseconds(track.starttime);

		if(starttime <= currentPosition) {
			var playing = track.trackname;
		}
		return playing;
	});

	push({
		type: 'SHALLOW_MERGE',
		data: {
			currentTrack: R.last(currentTrack).trackname
		}
	})
}