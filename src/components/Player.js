import React from 'react';
import Sound from 'react-sound';
import Q from 'q';
// import playerService from '../services/playerService.js';
import SM2 from 'soundmanager2';
import constants from '../constants/constants';

import PlayerSeek from './PlayerSeek';
import PlayerSetInfo from './PlayerSetInfo';
import PlayerTracklist from './PlayerTracklist';

var soundManager = SM2.soundManager;
var smDeferred = Q.defer();
var smPromise = smDeferred.promise;

var Player = React.createClass({
	
	displayName: 'Player',
	getInitialState: function() {
		return {
			playing: Sound.status.STOPPED
		};
	},
	// componentDidMount: function() {
	// 	var push = this.props.push;
	// 	// playerService.generateSound(0, this.props.appState, push)
	// 	// .then(function(smObj) {
	// 	// 	console.log('AYYLMAO', smObj);
	// 	// });
	// },

	componentDidMount: function() {
		var _this = this;

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
	},

	componentWillReceiveProps: function(nextProps) {
	},

	render: function() {
		var push = this.props.push;
		var appState = this.props.appState;
		// var currentSet = appState.get('currentSet'); // <- NOT IMMUTABLE MAP
		// var set = currentSet.set;
		// var setSMObject = currentSet.setSMObject;

		var currentSet = appState.get('currentSet');
		var tracklist = appState.get('tracklist');
		var songURL = constants.S3_ROOT + currentSet.songURL;
		console.log(currentSet);
		console.log(tracklist);

		var playingClass = 'fa center fa-pause play-button';
		var pausedClass = 'fa center fa-play play-button';

		var sound = {
			url: songURL,
			// playFromPosition: currentSet.starttime,//push this in tracktile
			playFromPosition: 300,
			playStatus: Sound.status.PLAYING
		};

		var currentTrack = currentSet.currentTrack;

		var trackProps = {
			currentTrack: currentTrack,
			tracklist: tracklist,
			push: push
		};

		console.log(this.state.playing);

		return (
			<div className='flex-row' id='Player'>

				<Sound {...sound} />

				<div className="player-image-container click" onClick={this.togglePlay}>
					<div className="overlay set-flex">
						<i className={playingClass}/>
					</div>
					<img src={constants.S3_ROOT_FOR_IMAGES+'small_'+currentSet.artistimageURL} />
				</div>

				<div className='flex-column flex'>
					<PlayerSeek currentSet={currentSet} push={push}/>
					<div className='flex-row flex'>
						<PlayerSetInfo currentSet={currentSet}
							time={currentSet.starttime}/>

						<PlayerTracklist {...trackProps} />

					</div>
				</div>
			</div>
		);
	}
});

var PlayerWrapper = React.createClass({
	displayName: 'PlayerWrapper',

	render: function() {

		var push = this.props.push;
		var appState = this.props.appState; // <- IMMUTABLE MAP
		var Rh = this.props.routeHandler;

		return (
			<div>
				<Rh appState={appState} push={push} />
				<Player appState={appState} push={push} />
			</div>
		);
	}
});

module.exports = PlayerWrapper;
