import React from 'react';
import {API_ROOT} from '../constants/constants';
import Loader from 'react-loader';
import EventContainer from './EventContainer';

var UpcomingEvents = React.createClass({

	getInitialState() {
		return {
			loaded: false,
			upcomingEvents: []
		};
	},

	componentWillMount() {
		this.getUpcomingEvents();
	},

	getUpcomingEvents() {
		var push = this.props.push;
		$.ajax({
			type: 'get',
			url: `${API_ROOT}events/upcoming`,
			data: {
				property: 'start_date',
				order: 'ASC'
			}
		})
		.done(res => {
			if(res.status === 'success') {
				// push({
				// 	type: 'SHALLOW_MERGE',
				// 	data: {
				// 		upcomingEvents: res.payload.upcoming
				// 	}
				// });
				this.setState({
					loaded: true,
					upcomingEvents: res.payload.upcoming
				});
			}
		});
	},

	render() {
		var props = {
			push: this.props.push,
			// events: this.props.appState.get('upcomingEvents'),
			events: this.state.upcomingEvents,
			containerClass: 'flex-row tile-container'
		};

		return (
			<Loader loaded={this.state.loaded}>
				<EventContainer {...props} />
			</Loader>	
		);
	}

});

export default UpcomingEvents;