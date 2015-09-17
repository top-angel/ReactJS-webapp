import React from 'react';
import playerService from '../services/playerService.js';
import convert from '../services/convert';

var Track = React.createClass({

	displayName: 'Track',
	getDefaultProps: function() {
		return {
			className: 'track flex',
			starttime: 0,
		};
	},

	changeTrack: function() {
		var appState = this.props.appState;
		var push = this.props.push;
		var currentTrack = this.props.trackname;

		var starttime = convert.MMSSToMilliseconds(this.props.starttime);
		console.log(starttime);
		playerService.changeTrack(appState, push, starttime, currentTrack);
	},

	render: function() {
		return (
			<div className={this.props.className} onClick={this.changeTrack} >
				<span className='starttime'>{this.props.starttime}</span>
				<span className='trackname'>{this.props.trackname}</span>
			</div>
		);
	}

});

module.exports = Track;