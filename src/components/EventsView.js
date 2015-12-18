import React from 'react';
import Loader from 'react-loader';

import FeaturedContainer from './FeaturedContainer';
import LocationModule from './LocationModule';
import EventContainer from './EventContainer';

var EventsView = React.createClass({

	componentDidMount() {
		mixpanel.track("Events Page Open");
	},
	
	render() {
		var {appState, push} = this.props;

		return (
			<div id="EventsView" className="view flex-column">
				<div className='view-title-container flex-column'>
					<h3 className='center'>Featured</h3>
					<div className='divider'/>
				</div>
				<FeaturedContainer 
					appState={appState}
					push={push} />
				<LocationModule
					push={push}
                	appState={appState} />
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