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
		var sets = this.state.sets
		var loginStatus = this.props.appState.get('isUserLoggedIn')
		var user = this.props.appState.get('user')
		var containerClass = 'flex-row scrollable'
		var push = this.props.push
		
		return (
			<Loader loaded={this.state.loaded}>
				<SetContainer
					push={push}
					sets={sets}
					containerClass={containerClass}
					loginStatus={loginStatus}
					user={user}
				/>
			</Loader>
		)
	}

})

module.exports = Popular