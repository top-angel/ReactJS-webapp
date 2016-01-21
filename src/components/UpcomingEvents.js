import React from 'react'
import BaseComponent from './BaseComponent'
import api from '../services/api'
import Loader from 'react-loader'
import EventContainer from './EventContainer'

export default class UpcomingEvents extends BaseComponent {
	constructor(props) {
		super(props)
		this.autoBind('getUpcomingEvents')
		this.state = {
			loaded: false,
			upcomingEvents: []
		}
		this.getUpcomingEvents()
	}
	getUpcomingEvents() {
		api.get('events/upcoming?property=start_date&order=ASC').then(res => {
			this.setState({
				loaded: true,
				upcomingEvents: res.upcoming
			})
		})
	}
	render() {
		return (
			<Loader loaded={this.state.loaded}>
				<EventContainer events={this.state.upcomingEvents} />
			</Loader>	
		)
	}
}