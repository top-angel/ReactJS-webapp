import React from 'react';

import playerService from '../services/playerService.js';

import PlayerControl from './PlayerControl';
import PlayerSeek from './PlayerSeek';
import PlayerSetInfo from './PlayerSetInfo';
import PlayerTracklist from './PlayerTracklist';

var Player = React.createClass({
	displayName: 'Player',

	componentDidMount: function() {
		var push = this.props.push;
		// playerService.generateSound(0, this.props.appState, push)
		//   .then(function(smObj) {
		//     console.log('AYYLMAO', smObj);
		//   });
	},

	// componentWillReceiveProps: function(nextProps) {
	// 	//check if set id from set obj has changed
	// 		//destroy current sound
	// 		//push new set object to appState
	// 		//update tracklist
	// 	var push = this.props.push;
	// 	if(nextProps.appState.get('currentSet').selectedSet.id 
	// 		!= this.props.appState.get('currentSet').selectedSet.id) {

	// 		console.log(nextProps.appState.get('currentSet').selectedSet.id );

	// 		push({
	// 			type: 'SHALLOW_MERGE',
	// 			data: {
	// 				currentSet: nextProps.appState.get('currentSet').selectedSet.id 
	// 			}
	// 		});
	// 	}
	// },

	// componentWillReceiveProps: function(nextProps) {
	// 	var push = this.props.push;
	// 	playerService.generateSound(0, this.props.appState, push)
	// 	  .then(function(smObj) {
	// 	    console.log('AYYLMAO', smObj);
	// 	  });
	// },

	dankify: function() {
		var push = this.props.push;

		push({
			type: 'SHALLOW_MERGE',
			data:{
				currentSet: {
					selectedSet: {
						id: 420
					}
				}
			}
		});
	},

	render: function() {

		var push = this.props.push;
		var appState = this.props.appState;
		var currentSet = appState.get('currentSet'); // <- NOT IMMUTABLE MAP
		var selectedSet = currentSet.selectedSet;
		var setSMObject = currentSet.setSMObject;

		var playingClass = 'fa center fa-pause play-button';
		var pausedClass = 'fa center fa-play play-button';

		//UNHIDE 
		return (
			<div className='flex-row' id='Player'>
				<div className="player-image-container click" onClick={this.togglePlay}>
					<div className="overlay set-flex">
						<i className={playingClass}/>
					</div>
					<img />
				</div>
				<div className='flex-column flex' onClick={this.dankify}>
					<PlayerSeek selectedSet={selectedSet} push={push}/>
					<div className='flex-row flex'>
						<PlayerSetInfo set={selectedSet}
							time={currentSet.timePosition}/>
						<PlayerTracklist track={setSMObject}/>
						<i className="fa fa-fw center fa-star-o click"/>
						<i className="fa fa-fw center fa-bars click"/>
						<i className="fa fa-fw center fa-share click"/>
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
