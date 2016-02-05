import React, {PropTypes} from 'react'
import Loader from 'react-loader'

import Base from './Base'
import Tabs from './Tabs'
import FeaturedEvents from './FeaturedEvents'
import Location from './Location'
import EventContainer from './EventContainer'

const tabs = [
	{
		text: 'UPCOMING',
		to: '/events',
		index: true
	},
	{
		text: 'NEAR YOU',
		to: '/events/closest',
		index: false
	}
	// {
	// 	text: 'FEATURED',
	// 	to: '/events/featured',
	// 	index: false
	// }
]

export default class EventsPage extends Base {
	constructor(props) {
		super(props)
	}
	componentWillMount() {
		this.context.push({ currentPage: 'Events' })
	}
	componentDidMount() {
		// mixpanel.track("Events Page Open")
	}
	render() {
		// return (
		// 	<div id='EventsView' className='view flex-column'>
		// 		<div className='view-title-container flex-column'>
		// 			<h3 className='center'>Featured</h3>
		// 			<div className='divider'/>
		// 		</div>
		// 		<FeaturedEvents appState={appState} />
		// 		<Location appState={appState} />
	 //        	{
		// 			React.cloneElement(this.props.children, {
		// 				appState: appState
		// 			})
		// 		}
		// 	</div>
		// )
		return (
			<div id='EventsPage' className='flex-column'>
				<Tabs tabs={tabs} />
				<Location appState={this.props.appState} />
				{
					React.cloneElement(this.props.children, {
						appState: this.props.appState
					})
				}
			</div>
		)
	}
}

EventsPage.contextTypes = {
	push: PropTypes.func
}