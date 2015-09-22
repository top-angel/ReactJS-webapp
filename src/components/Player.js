import React from 'react';
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
		var sound = this.props.appState.get('sound');
		var _this = this;

		if(sound != null) {
			push({
				type: 'SHALLOW_MERGE',
				data: {
					playerHidden: false
				}
			});
		}
	},

	componentWillReceiveProps: function(nextProps) {
		var push = this.props.push;

		if(nextProps.appState.get('currentSet') != this.props.appState.get('currentSet')) {
			var starttime = nextProps.appState.get('currentSet').starttime;

			playerService.generateSound(starttime, nextProps.appState, push)
			.then(function(smObj) {
				console.log('Now playing: ', smObj);

				// Log Mixpanel event
				var selectedSet = nextProps.appState.get('currentSet');
				var setName;
				if(selectedSet.episode != null && selectedSet.episode.length > 0) {
					setName = selectedSet.artist+" - "+selectedSet.event+" - "+selectedSet.episode;
				} else {
					setName = selectedSet.artist+" - "+selectedSet.event;
				}
				var setProperties = {
					"set_id": selectedSet.id,
					"set_name": setName,
					"set_artist": selectedSet.artist,
					"set_event": selectedSet.event
				};
				mixpanel.track("Set Play", setProperties);
				console.log(setProperties);

				//plays a new set
				push({
					type: 'SHALLOW_MERGE',
					data: {
						sound: smObj,
						playing: true,
						playerHidden: false
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
		var playerHidden = appState.get('playerHidden');

		var props = {
			appState: appState,
			push: push
		};

		if(playerHidden) {
			var playerClass = 'flex-row hidden';
		} else {
			var playerClass = 'flex-row';
		}

		return (
			<div className={playerClass} id='Player'>

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