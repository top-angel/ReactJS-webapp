import React from 'react'
import {millisecondsToMMSS} from '../services/convert'

// TODO use css modules

const PlayerSetInfo = props => {
	let appState = props.appState
	let currentSet = appState.get('currentSet')
	let timeElapsed = appState.get('timeElapsed')
	timeElapsed = millisecondsToMMSS(timeElapsed)

	return (
		<div id='PlayerSetInfo' className='flex-column flex-5x'>
			<p>{`${currentSet.artist} - ${currentSet.setName}`}</p>
			<p className='caption'>{`${timeElapsed} / ${currentSet.setLength}`}</p>
		</div>
	)
}

export default PlayerSetInfo