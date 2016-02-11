import React from 'react';
import Base from './Base';
import api from '../services/api';
import Loader from 'react-loader';
import EventContainer from './EventContainer';

export default class UpcomingEvents extends Base {
	constructor(props) {
		super(props);
		this.autoBind('getUpcomingEvents');
		this.state = {
			loaded: false,
			upcomingEvents: []
		};
	}
	componentWillMount() {
		this.getUpcomingEvents();
	}
	getUpcomingEvents() {
		api.get('events/upcoming').then(res => {
			this.setState({
				loaded: true,
				upcomingEvents: res.upcoming
			});
		});
	}
	render() {
		return (
			<Loader loaded={this.state.loaded}>
				<EventContainer events={this.state.upcomingEvents} />
			</Loader>	
		);
	}
}