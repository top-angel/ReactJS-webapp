import React from 'react'
import Loader from 'react-loader'
import {API_ROOT} from '../constants/constants'
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
		$.ajax({
			url: `${API_ROOT}sets/popular`,
			type: 'get'
		}).done(res => {
			if(res.status === 'success') {
				this.setState({
					loaded: true,
					sets: res.payload.sets_popular
				})
			}
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