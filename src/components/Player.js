import React from 'react';
import Sound from 'react-sound';
import playerService from '../services/playerService.js';
import constants from '../constants/constants';

import PlayerControl from './PlayerControl';
import PlayerSeek from './PlayerSeek';
import PlayerSetInfo from './PlayerSetInfo';
import PlayerTracklist from './PlayerTracklist';

var playingClass = 'fa center fa-pause play-button';
var pausedClass = 'fa center fa-play play-button';

var Player = React.createClass({
	
	displayName: 'Player',

	componentDidMount: function() {
		var push = this.props.push;
		var starttime = this.props.appState.get('currentSet').starttime;
		var _this = this;

	//HIDING so generateSound doesnt fire until a new set is pushed
		// playerService.generateSound(starttime, this.props.appState, push)
		// .then(function(smObj) {
		// 	console.log('AYYLMAO', smObj);

		// 	push({
		// 		type: 'SHALLOW_MERGE',
		// 		data: {
		// 			sound: smObj,
		// 			playing: true
		// 		}
		// 	});
		// });
	},

	componentWillReceiveProps: function(nextProps) {
		var push = this.props.push;

		if(nextProps.appState.get('currentSet') != this.props.appState.get('currentSet')) {
			var starttime = nextProps.appState.get('currentSet').starttime;
			console.log(starttime);

			playerService.generateSound(starttime, nextProps.appState, push)
			.then(function(smObj) {
				console.log('Now playing: ', smObj);
				//plays a new set
				push({
					type: 'SHALLOW_MERGE',
					data: {
						sound: smObj,
						playing: true
					}
				});
			});
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

		var currentSet = appState.get('currentSet');

		var props = {
			appState: appState,
			push: push
		};

		return (
			<div className='flex-row' id='Player'>

				<PlayerControl appState={appState} push={push} />

				<div className='flex-column flex'>
					<PlayerSeek appState={appState} push={push} />
					<div className='flex-row flex'>
						<PlayerSetInfo appState={appState} push={push} />

						<PlayerTracklist {...props} />

					</div>
				</div>
			</div>
		);
	}
});

// var PlayerWrapper = React.createClass({
// 	displayName: 'PlayerWrapper',

// 	render: function() {

// 		var push = this.props.push;
// 		var appState = this.props.appState; // <- IMMUTABLE MAP
// 		var Rh = this.props.routeHandler;

// 		return (
// 			<div>
// 				{
// 					React.cloneElement(this.props.children, {
// 						appState: appsState,
// 						push: push
// 					})
// 				}
// 				<Player appState={appState} push={push} />
// 			</div>
// 		);
// 	}
// });

module.exports = Player;