import React from 'react';
import Loader from 'react-loader';

import FeaturedEvents from './FeaturedEvents';
import Location from './Location';
import EventContainer from './EventContainer';

const EventsView = React.createClass({
	displayName: 'Events Page',
	componentDidMount() {
		mixpanel.track("Events Page Open");
	},
	render() {
		var {appState, push} = this.props;

		return (
			<div id='EventsView' className='view flex-column'>
				<div className='view-title-container flex-column'>
					<h3 className='center'>Featured</h3>
					<div className='divider'/>
				</div>
				<FeaturedEvents 
					appState={appState}
					push={push} />
				<Location appState={appState} />
	        	{
					React.cloneElement(this.props.children, {
						appState: appState,
						push: push
					})
				}
			</div>
		);
	}
});

export default EventsView