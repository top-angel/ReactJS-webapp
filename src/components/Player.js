import React from 'react';
import Sound from 'react-sound';
import Q from 'q';
import playerService from '../services/playerService.js';

import constants from '../constants/constants';

import PlayerSeek from './PlayerSeek';
import PlayerSetInfo from './PlayerSetInfo';
import PlayerTracklist from './PlayerTracklist';

var Player = React.createClass({
	
	displayName: 'Player',
	getInitialState: function() {
		return {
			smObj: null
		};
	},
	componentDidMount: function() {
		var push = this.props.push;
		var starttime = this.props.appState.get('currentSet').starttime;
		var _this = this;

		playerService.generateSound(starttime, this.props.appState, push)
		.then(function(smObj) {
			console.log('AYYLMAO', smObj);

			//DAS IT MAAAAAYNE
			push({
				type: 'SHALLOW_MERGE',
				data: {
					sound: smObj
				}
			});
		});
	},

	componentWillReceiveProps: function(nextProps) {
		var push = this.props.push;
		var starttime = this.props.appState.get('currentSet').starttime;

		if(nextProps.appState.get('currentSet') != this.props.appState.get('currentSet')) {
			console.log('BITCH I GOT EXTENDOZ');

			playerService.generateSound(starttime, nextProps.appState, push)
			.then(function(smObj) {
				console.log('YOU GOT A NEW SONG', smObj);

				push({
					type: 'SHALLOW_MERGE',
					data: {
						sound: smObj
					}
				})
			});
		} else {
			console.log('NO RELOADS');
		}
	},

	togglePlay: function() {
		var sound = this.props.appState.get('sound');
		console.log(sound);

		playerService.togglePlay(sound);
	},

	render: function() {
		var push = this.props.push;
		var appState = this.props.appState;
		// var set = currentSet.set;
		// var setSMObject = currentSet.setSMObject;

		var currentSet = appState.get('currentSet');
		var tracklist = appState.get('tracklist');
		var currentTrack = currentSet.currentTrack;
		var songURL = constants.S3_ROOT + currentSet.songURL;

		// console.log(currentSet);
		// console.log(tracklist);

		var playingClass = 'fa center fa-pause play-button';
		var pausedClass = 'fa center fa-play play-button';

		// var sound = {
		// 	url: songURL,
		// 	playFromPosition: currentSet.starttime,//push this in tracktile
		// 	playStatus: this.state.playing
		// };

		var trackProps = {
			currentTrack: currentTrack,
			tracklist: tracklist,
			push: push
		};

		return (
			<div className='flex-row' id='Player'>

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
