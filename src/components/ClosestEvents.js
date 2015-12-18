import React from 'react';
import {API_ROOT} from '../constants/constants';
import EventContainer from './EventContainer';

var ClosestEvents = React.createClass({
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