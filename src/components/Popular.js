import React from 'react'
import Loader from 'react-loader'
import api from '../services/api'
import SetContainer from './SetContainer'

var Popular = React.createClass({

	getInitialState() {
		return {
			loaded: false,
			sets: []
		}
	},

	componentWillMount() {
		this.getPopularSets()
	},

	componentDidMount() {
		mixpanel.track("Popular Sets Page Open")
	},

	getPopularSets() {
		api.get('sets/popular').then(res => {
			this.setState({
				loaded: true,
				sets: res.sets_popular
			});
		})
	},

	render() {
		return (
			<Loader loaded={this.state.loaded}>
				<SetContainer 
					className='flex-row scrollable'
					sets={this.state.sets} />
			</Loader>
		)
	}

})

export default Popular