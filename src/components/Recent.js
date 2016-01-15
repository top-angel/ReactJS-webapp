import React from 'react'
import Loader from 'react-loader'
import api from '../services/api'
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
		api.get('sets/recent').then(res => {
			this.setState({
				loaded: true,
				sets: res.sets_recent
			});
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