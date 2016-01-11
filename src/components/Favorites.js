import React from 'react';
import Loader from 'react-loader';
import {API_ROOT} from '../constants/constants';
import SetContainer from './SetContainer';
import $ from 'jquery';

const Favorites = React.createClass({

	componentWillMount() {
		var id = this.props.appState.get('user').id
		this.getFavoriteSets(id)
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
			this.props.push({
				type: 'SHALLOW_MERGE',
				data: {
					favorites: res.payload.setmineuser_stream
				}
			});

			this.setState({
				loaded: true
			});
		})
	},

	render() {
		var loginStatus = this.props.appState.get('isUserLoggedIn');
		var user = this.props.appState.get('user');
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