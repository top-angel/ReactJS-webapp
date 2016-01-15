import React from 'react';
import Loader from 'react-loader';
import $ from 'jquery';
import R from 'ramda';
import {API_ROOT} from '../constants/constants';
import {getFavoriteSets} from '../services/favoriteSet'
import SetContainer from './SetContainer';

const Favorites = React.createClass({

	contextTypes: {
		push: React.PropTypes.func,
		user: React.PropTypes.object,
		loginStatus: React.PropTypes.bool
	},

	componentDidMount() {
		mixpanel.track("Favorites Page Open");
		if(this.context.loginStatus) {
			this.setState({
				loaded: true
			})
		}
	},

	componentWillReceiveProps(nextProps, nextContext) {
		if(nextContext.loginStatus) {
			this.setState({
				loaded: true
			})
		}
	},

	getInitialState() {
		return {
			loaded: false
		}
	},

	getFavoriteSets(userId) {
		// getFavoriteSets(this.context.user.id, this.context.push)
		if(this.context.loginStatus) {
			this.setState({
				loaded: true
			})
		}
	},

	// showFavorites(loginStatus) {
	// 	if(loginStatus) {
	// 		return (
	// 			<Loader loaded={this.state.loaded}>
	// 				<SetContainer sets={this.props.appState.get('favorites')})} />
	// 			</Loader>
	// 		);
	// 	} else {
	// 		return
	// 	}
	// },

	render() {
		var favorites = this.props.appState.get('favorites')
		return (
			<Loader loaded={this.state.loaded}>
				<SetContainer sets={favorites} />
			</Loader>
		);
	}

});

export default Favorites