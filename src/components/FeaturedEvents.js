import React from 'react';
import Base from './Base';
import api from '../services/api';
import Loader from 'react-loader';
import FeaturedContainer from './FeaturedContainer';

export default class FeaturedEvents extends Base {
	constructor(props) {
		super(props);
		this.autoBind('getFeaturedEvents');
		this.state = {
			loaded: false,
			events: []
		};
	}
	componentWillMount() {
		this.getFeaturedEvents();
	}
	getFeaturedEvents() {
		api.get('events/featured').then(payload => {
			var featuredEvents = payload.events_featured
			this.setState({
				loaded: true,
				events: featuredEvents
			});
		});
	}
	render() {
		return (
			<Loader loaded={this.state.loaded}>
				<FeaturedContainer festivals={this.state.events} />
			</Loader>
		);
	}
}