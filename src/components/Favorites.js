import React, {PropTypes} from 'react';
import Loader from 'react-loader';
import {getFavoriteSets} from '../services/favoriteSet'
import api from '../services/api'
import Base from './Base';
import SetContainer from './SetContainer';
import NoFavorites from './NoFavorites';

export default class Favorites extends Base {
	constructor(props) {
		super(props);
		this.autoBind('getFavoriteSets', 'renderFavorites');
		this.state = {
			loaded: false,
			favorites: []
		};
	}
	componentDidMount() {
		const {loginStatus, push} = this.context;
		if(loginStatus) {
			this.getFavoriteSets(this.context.user.id);
		} else {
			push({ showLogin: true });
		}
		mixpanel.track("Favorites Page Open");
	}
	componentWillReceiveProps(nextProps, nextContext) {
		if(nextContext.loginStatus) {
			this.getFavoriteSets(nextContext.user.id);
		}
	}
	getFavoriteSets(userId) {
		api.get(`setmineuser/${userId}/stream?filter=favorites`).then(payload =>{
			if(payload.setmineuser_stream.length == 0) {
				return;
			}

			this.setState({
				favorites: payload.setmineuser_stream,
				loaded: true
			});
		});
	}
	renderFavorites() {
		if(this.state.favorites.length === 0) {
			return <NoFavorites />
		}

		return (
			<Loader loaded={this.state.loaded}>
				<SetContainer sets={this.state.favorites} />
			</Loader>
		);
	}
	render() {
		return this.renderFavorites();
	}
}

Favorites.contextTypes = {
	push: React.PropTypes.func,
	user: React.PropTypes.object,
	loginStatus: React.PropTypes.bool
};
	