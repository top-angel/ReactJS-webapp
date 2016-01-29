import React from 'react'
import {millisecondsToMMSS} from '../services/convert'

// TODO use css modules

const PlayerSetInfo = props => {
	var appState = props.appState
	var currentSet = appState.get('currentSet')
	var timeElapsed = appState.get('timeElapsed')
	var time = millisecondsToMMSS(timeElapsed)

	return (
		<div className='set-info flex-column flex-5x'>
			<div className='set-name flex'>
				{currentSet.artist + ' - ' + currentSet.setName}
			</div> 
			<div className='set-time flex'>
				{time + ' / ' + currentSet.setLength}
			</div>
		</div>
	)
}

export default PlayerSetInfo