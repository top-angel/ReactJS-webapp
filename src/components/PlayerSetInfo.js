import React from 'react';
import convert from '../services/convert';

var PlayerSetInfo = React.createClass({
	render() {
		var appState = this.props.appState;
		var currentSet = appState.get('currentSet');
		var timeElapsed = appState.get('timeElapsed');
		var time = convert.millisecondsToMMSS(timeElapsed);

		return (
			<div className='set-info flex-column flex-5x'>
				<div className='set-name flex'>
					{currentSet.artist + ' - ' + currentSet.event}
				</div> 
				<div className='set-time flex'>
					{time + ' / ' + currentSet.setLength}
				</div>
			</div>
		);
	}
});

export default PlayerSetInfo;