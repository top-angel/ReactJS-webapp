import React from 'react'
import {API_ROOT} from '../constants/constants'

import Loader from 'react-loader'
import FeaturedTile from './FeaturedTile'

var FeaturedContainer = React.createClass({
		
	getInitialState() {
		return {
			loaded: false,
			events: []
		}
	},

	componentWillMount() {
		this.getFeaturedEvents()
	},

	getFeaturedEvents() {
		$.ajax({
			url: `${API_ROOT}events/featured`,
			type: 'get'
		}).done(res => {
			if(res.status === 'success') {
				var featuredEvents = res.payload.events_featured
				this.setState({
					loaded: true,
					events: featuredEvents
				})
			}
		})
	},

	render() {
		var featuredEvents = this.state.events
		var push = this.props.push
		var featuredTiles = featuredEvents.map((event, index) => {
			var props = {
				key: index,
				id: event.event_id,
				event: event.event.event,
				banner_image: event.event.banner_image.imageURL,
				formattedDate: event.event.formatted_date,
				push: push,
				set_count: event.event.set_count
			}

			return <FeaturedTile {...props} />
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
})

export default FeaturedContainer