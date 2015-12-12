import React from 'react';
import {changeTrack} from '../services/playerService.js';
import convert from '../services/convert';

var Track = React.createClass({

	getDefaultProps() {
		return {
			className: 'track flex',
			starttime: 0,
		};
	},

	changeTrack() {
		var {push, trackname, starttime, className} = this.props;
		var starttime = convert.MMSSToMilliseconds(starttime);
		changeTrack(appState, push, starttime, trackname);
	},

	render() {
		var {trackname, starttime, className} = this.props;

		return (
			<div className={className} onClick={this.changeTrack} >
				<span className='starttime'>{starttime}</span>
				<span className='trackname'>{trackname}</span>
			</div>
		);
	}

});

module.exports = Track;