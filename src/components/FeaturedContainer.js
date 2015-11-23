import React from 'react';
import {API_ROOT} from '../constants/constants';
import splice from '../services/splice';
import Loader from 'react-loader';

import FeaturedTile from './FeaturedTile';

var FeaturedContainer = React.createClass({
		
	getInitialState() {
		return {
			loaded: false
		};
	},

	componentWillMount() {
		this.getFeaturedEvents();
	},

	getFeaturedEvents() {
		var push = this.props.push;

		//url only shows recent festivals, no upcoming events
		$.ajax({
			url: `${API_ROOT}events/featured`,
			type: 'get'
		})
		.done(res => {
			if(res.status === 'success') {
				var featuredEvents = res.payload.events_featured;
				push({
					type: 'SHALLOW_MERGE',
					data: {
						featuredEvents: featuredEvents
					}
				});

				this.setState({
					loaded: true
				});
			}
		});
	},

	render() {
		var featuredEvents = this.props.appState.get('featuredEvents');
		var push = this.props.push;

		console.log(featuredEvents.length);
		
		var featuredTiles = featuredEvents.map((event, index) => {
			var props = {
				key: index,
				id: event.event_id,
				event: event.event.event,
				main_imageURL: event.event.banner_image.imageURL,
				formattedDate: event.event.formatted_date,
				push: push,
				type: event.event.type
			};

			return <FeaturedTile {...props} />
		});

		return (
			<Loader loaded={this.state.loaded}>
				<div id='FeaturedContainer'>
					<div className='container'>
						{featuredTiles}
					</div>
				</div>
			</Loader>
		);
	}
});

module.exports = FeaturedContainer;