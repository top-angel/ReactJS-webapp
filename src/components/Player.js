import React from 'react';

import playerService from '../services/playerService.js';

// import PlayerControl from './PlayerControl';
import PlayerSeek from './PlayerSeek';
import PlayerSetInfo from './PlayerSetInfo';
import PlayerTrackInfo from './PlayerTrackInfo';

var Player = React.createClass({
	displayName: 'Player',

	componentDidMount: function() {
		// var push = this.props.pushFn;
		// playerService.generateSound(0, this.props.appState, push)
		//   .then(function(smObj) {
		//     console.log('AYYLMAO', smObj);
		//   });
	},

	render: function() {

		var push = this.props.push;
		var appState = this.props.appState;
		var currentSet = appState.get('currentSet'); // <- NOT IMMUTABLE MAP
		var selectedSet = currentSet.selectedSet;
		var setSMObject = currentSet.setSMObject;

		var playingClass = 'fa center fa-pause';
		var pausedClass = 'fa center fa-play';

		//UNHIDE 
		return (
			<div className='flex-row' id='Player'>
					<PlayerControl />
					<div className='flex-column flex'>
							<PlayerSeek selectedSet={selectedSet} push={push}/>
							<div className='flex-row flex'>
									<PlayerSetInfo set={selectedSet}
										time={currentSet.timePosition}/>
									<PlayerTrackInfo track={setSMObject}/>
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
