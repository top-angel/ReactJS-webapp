import React from 'react';
import playerService from '../services/playerService.js';
import convert from '../services/convert';

var PlayerSeek = React.createClass({

	displayName: 'PlayerSeek',
	scrub: function(e) {
		var push = this.props.push;
		var appState = this.props.appState;

		var offset = 70.5;//width of image container
		var percentWidth = ((e.pageX - offset)/ $(window).width()) * 100;

		playerService.scrub(percentWidth, appState, push);
	},

	render: function() {
		var appState = this.props.appState;

		var currentSet = appState.get('currentSet');
		var timeElapsed = appState.get('timeElapsed');
		var set_length = convert.MMSSToMilliseconds(currentSet.set_length);

		var percent = (timeElapsed / set_length) * 100;
		console.log(percent);

		var progressStyle = {
			width: percent + '%'
		};

		var scrubber = React.createElement('div', {
			className: 'player-seek-position',
			style: progressStyle
		});
		
		return (
			<div className='player-seek-container' onClick={this.scrub} >
				{scrubber}
	       </div>
		);
	}
})

module.exports = PlayerSeek;