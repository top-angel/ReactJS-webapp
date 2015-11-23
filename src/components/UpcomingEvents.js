import React from 'react';
import {API_ROOT} from '../constants/constants';
import Loader from 'react-loader';
import EventContainer from './EventContainer';

var UpcomingEvents = React.createClass({

	getInitialState() {
		return {
			loaded: false
		};
	},

	getDefaultProps() {
		return {
			appState: {
				soonestEvents: []
			}
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
				console.log(res.payload);
				push({
					type: 'SHALLOW_MERGE',
					data: {
						upcomingEvents: res.payload.upcoming
					}
				});
				this.setState({
					loaded: true
				});
			}
		});
	},

	render() {
		var props = {
			push: this.props.push,
			events: this.props.appState.get('upcomingEvents'),
			containerClass: 'flex-row tile-container'
		};

		return (
			<Loader loaded={this.state.loaded}>
				<EventContainer {...props} />
			</Loader>	
		);
	}

});

module.exports = UpcomingEvents;