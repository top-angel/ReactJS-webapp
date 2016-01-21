import React from 'react';
import {scrub} from '../services/playerService';
import {MMSSToMilliseconds} from '../services/convert';

var PlayerSeek = React.createClass({

	contextTypes: {
		push: React.PropTypes.func
	},

	scrub(e) {
		var push = this.context.push;
		var appState = this.props.appState;
		var offset = document.getElementById('PlayButton').offsetWidth;
		var containerWidth = document.getElementById('progress').offsetWidth;

		var errorFactor = 1.0575; //compensates for soundmanger innacuracy
		var containerPosition = (((e.pageX - offset)*errorFactor)/ $(window).width()) * 100;

		scrub(containerPosition, appState, push);
	},

	render() {
		var appState = this.props.appState;
		var currentSet = appState.get('currentSet');
		var timeElapsed = appState.get('timeElapsed');

		var setLength = MMSSToMilliseconds(currentSet.setLength);
		var percent = (timeElapsed / setLength) * 100;

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

export default PlayerSeek;