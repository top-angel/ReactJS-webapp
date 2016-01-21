import React from 'react'
import BaseComponent from './BaseComponent'
import api from '../services/api'

import Loader from 'react-loader'
import FeaturedTile from './FeaturedTile'

export default class FeaturedEvents extends BaseComponent {
	constructor(props) {
		super(props)
		this.autoBind('getFeaturedEvents')
		this.state = {
			loaded: false,
			events: []
		}
		this.getFeaturedEvents()
	}
	getFeaturedEvents() {
		api.get('events/featured').then(res => {
			var featuredEvents = res.events_featured
			this.setState({
				loaded: true,
				events: featuredEvents
			})
		})
	}
	render() {
		var featuredEvents = this.state.events
		var push = this.props.push
		var featuredTiles = featuredEvents.map((event, index) => {
			return React.createElement(FeaturedTile, {
				key: index,
				id: event.event_id,
				event: event.event.event,
				banner_image: event.event.banner_image.imageURL,
				formattedDate: event.event.formatted_date,
				push: push,
				set_count: event.event.set_count
			})
		})

		return (
			<Loader loaded={this.state.loaded}>
				<div id='FeaturedContainer'>
					<div className='container'>
						{featuredTiles}
					</div>
				</div>
			</Loader>
		)
	}
}