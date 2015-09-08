import React from 'react';

import playerService from '../services/playerService.js';

var PlayerControl = require('./PlayerControl');
var PlayerSeek = require('./PlayerSeek');
var PlayerSetInfo = require('./PlayerSetInfo');
var PlayerTrackInfo = require('./PlayerTrackInfo');

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

		//UNHIDE 
		return (
			<div className='player flex-row hidden'>
					<PlayerControl selectedSet={selectedSet} push={push}/>
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
