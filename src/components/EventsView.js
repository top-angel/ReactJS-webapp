import React from 'react'
import Loader from 'react-loader'

import FeaturedEvents from './FeaturedEvents'
import Location from './Location'
import EventContainer from './EventContainer'

export default class EventsView extends React.Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		mixpanel.track("Events Page Open")
	}
	render() {
		var appState = this.props.appState
		return (
			<div id='EventsView' className='view flex-column'>
				<div className='view-title-container flex-column'>
					<h3 className='center'>Featured</h3>
					<div className='divider'/>
				</div>
				<FeaturedEvents appState={appState} />
				<Location appState={appState} />
	        	{
					React.cloneElement(this.props.children, {
						appState: appState
					})
				}
			</div>
		)
	}
}