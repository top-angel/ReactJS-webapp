import React from 'react'
import BaseComponent from './BaseComponent'

import Loader from 'react-loader'
import api from '../services/api'
import SetContainer from './SetContainer'

export default class Recent extends BaseComponent {
	constructor(props) {
		super(props)
		this.autoBind('getRecentSets')
		this.state = {
			loaded: false,
			sets: []
		}
		this.getRecentSets()
	}
	componentDidMount() {
		mixpanel.track("Sets Page Open")
	}
	getRecentSets() {
		api.get('sets/recent').then(res => {
			this.setState({
				loaded: true,
				sets: res.sets_recent
			})
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