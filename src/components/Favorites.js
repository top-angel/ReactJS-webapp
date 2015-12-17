import React from 'react';
import Loader from 'react-loader';
import {API_ROOT} from '../constants/constants';
import SetContainer from './SetContainer';

var Favorites = React.createClass({

	componentWillMount() {
		this.getFavoriteSets()
	},

	componentDidMount() {
		mixpanel.track("Favorites Page Open");
	},

	getFavoriteSets() {
		$.ajax({
			type: 'get',
			url: `${API_ROOT}setmineuser/${userId}/stream`,
			data: {
				filter: 'favorites'
			}
		}).done(res => {
			this.props.push({
				type: 'SHALLOW_MERGE',
				data: {
					favorites: res.payload.setmineuser_stream
				}
			})
		})
	},

	render() {
		var loginStatus = this.props.appState.get('isUserLoggedIn');
		var user = this.props.appState.get('user');
		// var favorites = user.favorite_sets;
		var favorites = this.props.appState.get('favorites')

		return (
			<Loader loaded={this.state.loaded}>
				<SetContainer
					sets={favorites}
					push={this.props.push}
					loginStatus={loginStatus}
					user={user}
				/>
			</Loader>
		);
	}

});

export default Favorites