import Q from 'q';
import R from 'ramda';
import $ from 'jquery';
import SM2 from 'soundmanager2';

import convert from './convert';
import constants from '../constants/constants';

var soundManager = SM2.soundManager;

// This will resolve when soundManager loads
var smDeferred = Q.defer();
var smPromise = smDeferred.promise;


soundManager.setup({
	url: '/swf/soundmanager2.swf',
	onready: function() {
		console.log('SM2 loaded');
		smDeferred.resolve();
	},
	ontimeout: function() {
		console.log('Error loading SoundManager2');
	}
});


function errorPromise(jqXHR, textStatus, errorThrown) {
	console.log('ERROR MAKING AJAX CALL', jqXHR, textStatus, errorThrown);
	return  Q.reject(errorThrown);
}

//HIDE FOR NOW
// function fetchTrackList(selectedSet) {
// 	var trackListUrl = constants.API_ROOT + 'tracklist/' + selectedSet.id;

// 	return $.ajax({
// 		url: trackListUrl,
// 		type: 'get'
// 	});
// }


function generateSound(loadStart, appState, push) {

	var sound = appState.get('sound');
	var currentSet = appState.get('currentSet');
	// var selectedSet = currentSet.selectedSet;
	var selectedSet = currentSet;

	var currentSetCopy = R.clone(currentSet);

	if(loadStart) {
		loadStart = convert.MMSSToMilliseconds(loadStart);
	} else {
		loadStart = 0;
		console.log('started from the bottom');
	}

	//// XXX TODO MOVE THIS
	if(sound != null) {
		soundManager.destroySound('currentSound');
	}

	//HIDE FOR NOW
	// fetchTrackList(selectedSet).then(function(response) {
	// 	console.log(response.payload);
	// 	return response.payload;
	// }, errorPromise);


	var songURL = constants.S3_ROOT + selectedSet.songURL;
	console.log(songURL);

	var soundConf = {
		id: 'currentSound',
		url: songURL,
		load: loadStart,
		onload: function() {
			var totalTime = sound.durationEstimate;
			console.log(totalTime);
		},

		whileplaying: function() {
			var currentTime = sound.position;
			// currentSetCopy.timePosition = currentTime;
			//might delete
			// push({
			// 	type: 'SHALLOW_MERGE',
			// 	data: { currentSet: currentSetCopy }
			// });

			//UPDATE CURRENT TRACK HERE
			var tracklist = appState.get('tracklist');
			var currentTrack = updateCurrentTrack(sound, tracklist, push);

			push({
				type: 'SHALLOW_MERGE',
				data: {
					timeElapsed: currentTime
				}
			});
		}
	};

	return smPromise.then(function() {
		sound = soundManager.createSound(soundConf);
		sound.setPosition(loadStart);
		soundManager.play('currentSound');
		return sound;
	});

	//UNHIDE if sets don't load
	// push({
	// 	type: 'SHALLOW_MERGE',
	// 	data: {
	// 		sound: sound
	// 	}
	// });
}

function togglePlay(sound) {

	if(sound.paused) {
		sound.play();
		console.log('play');
	} else {
		sound.pause();
		console.log('pause');
	}
}

//scrub to a new position after clicking progress bar
function scrub(position, appState, push) {
	var sound = appState.get('sound');
	var currentSet = appState.get('currentSet');
	var timeElapsed = appState.get('timeElapsed');

	var set_length = convert.MMSSToMilliseconds(currentSet.set_length);
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

// automatically update tracklist while playing
function updateCurrentTrack(sound, tracklist, push) {
	var testTrack = convert.MMSSToMilliseconds(tracklist[1].starttime);
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
			currentTrack: currentTrack[currentTrack.length - 1].trackname
		}
	})
}

module.exports = {
	generateSound: generateSound,
	togglePlay: togglePlay,
	changeTrack: changeTrack,
	updateCurrentTrack: updateCurrentTrack,
	scrub: scrub,
	convert: convert // TODO MOVE CONVERT INTO SEPARATE SERVICE
};
