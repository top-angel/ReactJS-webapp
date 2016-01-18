import React from 'react';
import R from 'ramda';
import Loader from 'react-loader';

import {getFavoriteSets} from '../services/favoriteSet'
import api from '../services/api'
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
			this.getFavoriteSets(this.context.user.id)
		}
	},

	componentWillReceiveProps(nextProps, nextContext) {
		if(nextContext.loginStatus) {
			this.getFavoriteSets(nextContext.user.id)
		}
	},

	getInitialState() {
		return {
			loaded: false,
			favorites: []
		}
	},

	getFavoriteSets(userId) {
		api.get(`setmineuser/${userId}/stream?filter=favorites`).then(res =>{
			this.setState({
				favorites: res.setmineuser_stream,
				loaded: true
			});
		})
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
		var favorites = this.state.favorites;
		return (
			<Loader loaded={this.state.loaded}>
				<SetContainer sets={favorites} />
			</Loader>
		);
	}

});

export default Favorites