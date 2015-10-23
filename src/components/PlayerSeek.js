import React from 'react';
import playerService from '../services/playerService.js';
import convert from '../services/convert';

var PlayerSeek = React.createClass({

	displayName: 'PlayerSeek',

	scrub: function(e) {
		var push = this.props.push;
		var appState = this.props.appState;
		var offset = document.getElementById('PlayButton').offsetWidth;
		var containerWidth = document.getElementById('progress').offsetWidth;

		var errorFactor = 1.0575; //compensates for soundmanger innacuracy
		var containerPosition = (((e.pageX - offset)*errorFactor)/ $(window).width()) * 100;

		playerService.scrub(containerPosition, appState, push);
	},

	render: function() {
		var appState = this.props.appState;
		var currentSet = appState.get('currentSet');
		var timeElapsed = appState.get('timeElapsed');

		var set_length = convert.MMSSToMilliseconds(currentSet.set_length);
		var percent = (timeElapsed / set_length) * 100;

		var progressStyle = {
			width: percent + '%'
		};

		var playerProgress = React.createElement('div', {
			className: 'player-progress',
			style: progressStyle
		});

		var cursor = React.createElement('div', {
			className: 'player-scrubber',
			id: 'progress'
		});
		
		return (
			<div className='player-seek-container' onClick={this.scrub} >
				{playerProgress}
				{cursor}
	       </div>
		);
	}
})

module.exports = PlayerSeek;