import React from 'react';
import Loader from 'react-loader';
import {API_ROOT} from '../constants/constants';
import SetContainer from './SetContainer';
import $ from 'jquery';

const Favorites = React.createClass({

	contextTypes: {
		push: React.PropTypes.func,
		user: React.PropTypes.object,
		loginStatus: React.PropTypes.bool
	},

	componentWillMount() {
		var userId = this.context.user.id;
		if(this.context.loginStatus) {
			this.getFavoriteSets(userId)
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
			this.context.push({
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

	showFavorites(loginStatus) {
		if(loginStatus) {
			var favorites = this.props.appState.get('favorites')
			return (
				<Loader loaded={this.state.loaded}>
					<SetContainer sets={favorites} />
				</Loader>
			)
		} else {
			return
		}
	},

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