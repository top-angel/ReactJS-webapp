import React from 'react'
import Loader from 'react-loader'
import {API_ROOT} from '../constants/constants'
import SetContainer from './SetContainer'

var Recent = React.createClass({

	getInitialState() {
		return {
			loaded: false,
			sets: []
		}
	},

	componentWillMount() {
		this.getRecentSets()
	},

	componentDidMount() {
		mixpanel.track("Sets Page Open")
	},

	getRecentSets() {
		$.ajax({
			url: `${API_ROOT}sets/recent`,
			type: 'get'
		}).done(res => {
			if(res.status === 'success') {
				this.setState({
					loaded: true,
					sets: res.payload.sets_recent
				})
			}
		})
	},

	render() {
		return (
			<Loader loaded={this.state.loaded}>
				<SetContainer sets={this.state.sets} />
			</Loader>
		)
	}

})

export default Recent