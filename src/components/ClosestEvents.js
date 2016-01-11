import React from 'react';
import {API_ROOT} from '../constants/constants';
import EventContainer from './EventContainer';

const ClosestEvents = React.createClass({
	displayName: 'Events Around Me',
	render() {
		var props = {
			events: this.props.appState.get('closestEvents'),
			push: this.props.push
		};

		return (
			<EventContainer {...props} />
		);
	}
});

export default ClosestEvents;