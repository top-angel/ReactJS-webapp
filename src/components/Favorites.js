import React from 'react';
import Loader from 'react-loader';
import {API_ROOT} from '../constants/constants';
import SetContainer from './SetContainer';
import $ from 'jquery';
import R from 'ramda';

const Favorites = React.createClass({

	contextTypes: {
		push: React.PropTypes.func,
		user: React.PropTypes.object,
		loginStatus: React.PropTypes.bool
	},

	componentWillMount() {
		if(this.context.loginStatus) {
			this.getFavoriteSets(this.context.user.id)
		}
	},

	componentDidMount() {
		mixpanel.track("Favorites Page Open");
	},

	getInitialState() {
		return {
			loaded: false
		};
	},

	getFavoriteSets(userId) {
		$.ajax({
			type: 'get',
			url: `${API_ROOT}setmineuser/${userId}/stream`,
			data: {
				filter: 'favorites'
			}
		}).done(res => {
			// store user's favorite set ids in appState
			var favorites = res.payload.setmineuser_stream;
			var favoriteSetIds = R.pluck('id', favorites);
			console.log(favoriteSetIds);

			this.context.push({
				type: 'SHALLOW_MERGE',
				data: {
					favorites: favorites,
					favoriteSetIds: favoriteSetIds
				}
			});

			this.setState({
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
		var favorites = this.props.appState.get('favorites')
		return (
			<Loader loaded={this.state.loaded}>
				<SetContainer sets={favorites} />
			</Loader>
		);
	}

});

export default Favorites