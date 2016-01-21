import React from 'react'
import EventContainer from './EventContainer'

const ClosestEvents = ( props ) => {
	return <EventContainer events={props.appState.get('closestEvents')} />
}

export default ClosestEvents