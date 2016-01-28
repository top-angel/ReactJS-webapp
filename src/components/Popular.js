import React from 'react'
import BaseComponent from './BaseComponent'
import Loader from 'react-loader'
import api from '../services/api'
import SetContainer from './SetContainer'
import Spinner from './Spinner'

export default class Popular extends BaseComponent {
	constructor(props) {
		super(props)
		this.autoBind('getPopularSets', 'onScroll')
		this.state = {
			loaded: false,
			sets: [],
			page: 1
		}
		this.getPopularSets()
	}
	componentDidMount() {
		mixpanel.track("Popular Sets Page Open")
	}
	getPopularSets(page=this.state.page) {
		api.get(`sets/popular?limit=36&page=${page}`).then(res => {
			// merge new sets to existing
			let sets = this.state.sets.concat(res.sets_popular)

			this.setState({
				loaded: true,
				sets: sets,
				page: page + 1
			});
		})
	}
	onScroll() {
		this.getPopularSets(this.state.page)
	}
	render() {
		return (
			<Loader loaded={this.state.loaded}>
				<SetContainer sets={this.state.sets} onScroll={this.onScroll} />
				<Spinner />
			</Loader>
		)
	}
}