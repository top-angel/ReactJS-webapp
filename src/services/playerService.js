import Q from 'q';
import R from 'ramda';
import $ from 'jquery';
import SM2 from 'soundmanager2';
import _ from 'underscore';

import convert from './convert';
import constants from '../constants/constants';

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
function changeTrack(appState, push, starttime, currentTrack) {
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

function generateSound(loadStart, appState, push) {

	var sound = appState.get('sound');
	var currentSet = appState.get('currentSet');
	loadStart = convert.MMSSToMilliseconds(loadStart);

	//// XXX TODO MOVE THIS
	if(sound != null) {
		soundManager.destroySound('currentSound');
	}

	var songURL = constants.S3_ROOT + currentSet.songURL;

	var soundConf = {
		id: 'currentSound',
		url: songURL,
		load: loadStart,
		onload: function() {
			var totalTime = sound.durationEstimate;
		},
		// volume: 0, //comment out for production
		whileplaying: function() {
			var currentTime = sound.position;
			//UPDATE CURRENT TRACK HERE
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

//scrub to a new position after clicking progress bar
function scrub(position, appState, push) {
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

function togglePlay(sound) {
	if(sound.paused) {
		sound.play();
	} else {
		sound.pause();
	}
}

// automatically update tracklist while playing
function updateCurrentTrack(sound, tracklist, push) {
	var currentPosition = sound.position;

	var currentTrack = tracklist.filter(function(track, index) {
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

module.exports = {
	generateSound: generateSound,
	togglePlay: togglePlay,
	changeTrack: changeTrack,
	updateCurrentTrack: updateCurrentTrack,
	scrub: scrub
};