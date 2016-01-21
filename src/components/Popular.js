import React from 'react'
import BaseComponent from './BaseComponent'
import Loader from 'react-loader'
import api from '../services/api'
import SetContainer from './SetContainer'

export default class Popular extends BaseComponent {
	constructor(props) {
		super(props)
		this.autoBind('getPopularSets')
		this.state = {
			loaded: false,
			sets: []
		}
		this.getPopularSets()
	}
	componentDidMount() {
		mixpanel.track("Popular Sets Page Open")
	}
	getPopularSets() {
		api.get('sets/popular').then(res => {
			this.setState({
				loaded: true,
				sets: res.sets_popular
			});
		})
	}
	render() {
		return (
			<Loader loaded={this.state.loaded}>
				<SetContainer sets={this.state.sets} />
			</Loader>
		)
	}
}