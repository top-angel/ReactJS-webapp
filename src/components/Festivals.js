import React from 'react';
import Loader from 'react-loader';
import api from '../services/api';

import FestivalContainer from './FestivalContainer';
import Base from './Base';

export default class Festivals extends Base {
	constructor(props) {
		super(props)
		this.autoBind('getFestivals')
		this.state = {
			loaded: false,
			festivals: []
		}
		this.getFestivals()
	}
	componentDidMount() {
		mixpanel.track("Festivals Page Open")
	}
	getFestivals() {
		api.get('events/festivals').then(payload => {
			this.setState({
				loaded: true,
				festivals: payload.events_festivals
			})
		})
	}
	render() {
		return (
			<Loader loaded={this.state.loaded}>
				<FestivalContainer festivals={this.state.festivals} />
			</Loader>
		)
	}
}