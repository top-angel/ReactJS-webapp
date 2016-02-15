import React, {PropTypes} from 'react';
import Loader from 'react-loader';

import Base from './Base';
import Tabs from './Tabs';
import Tab from './Tab';
import FeaturedEvents from './FeaturedEvents';
import Location from './Location';
import EventContainer from './EventContainer';

export default class EventsPage extends Base {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
		this.context.push({ currentPage: 'Events' });
	}
	componentDidMount() {
		// mixpanel.track("Events Page Open");
	}
	render() {
		return (
			<div className='view'>
				<Tabs>
					<Tab to='/events'>UPCOMING</Tab>
					<Tab to='/events/closest'>NEAR YOU</Tab>
					<Tab to='/events/featured'>FEATURED</Tab>
				</Tabs>
				{
					React.cloneElement(this.props.children, {
						appState: this.props.appState
					})
				}
			</div>
		);
	}
}

EventsPage.contextTypes = {
	push: PropTypes.func
};