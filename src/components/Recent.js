import React from 'react'
import Base from './Base'
import R from 'ramda'
import Loader from 'react-loader'
import api from '../services/api'
import SetContainer from './SetContainer'
import Spinner from './Spinner'

export default class Recent extends Base {
	constructor(props) {
		super(props)
		this.autoBind('getRecentSets', 'onScroll')
		this.state = {
			loaded: false,
			sets: [],
			page: 1
		}
		this.getRecentSets()
	}
	componentDidMount() {
		mixpanel.track("Sets Page Open")
	}
	getRecentSets(page=this.state.page) {
		api.get(`sets/recent?limit=24&page=${page}`).then(res => {
			// merge sets to existing sets
			let sets = this.state.sets.concat(res.sets_recent)

			this.setState({
				loaded: true,
				sets: sets,
				page: page + 1
			})
		})
	}
	onScroll() {
		this.getRecentSets(this.state.page)
	}
	render() {
		return (
			<Loader loaded={this.state.loaded}>
				<SetContainer sets={this.state.sets} onScroll={this.onScroll}/>
				<Spinner />
			</Loader>
		)
	}
}