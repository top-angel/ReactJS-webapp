import React from 'react';
import {changeTrack} from '../services/playerService';
import {MMSSToMilliseconds} from '../services/convert';

var Track = React.createClass({

	contextTypes: {
		push: React.PropTypes.func
	},

	getDefaultProps() {
		return {
			className: 'track flex',
			starttime: 0,
		};
	},

	changeTrack() {
		var {appState, trackname, starttime, className} = this.props;
		var starttime = MMSSToMilliseconds(starttime);
		changeTrack(appState, this.context.push, starttime, trackname);
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

export default Track;