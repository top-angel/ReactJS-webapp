import React, {PropTypes, Component} from 'react';
import Loader from 'react-loader';

import {getFavoriteSets} from '../services/favoriteSet'
import api from '../services/api'
import SetContainer from './SetContainer';

export default class Favorites extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded	: false,
			favorites: []
		};
	}
	componentDidMount() {
		if(this.context.loginStatus) {
			this.getFavoriteSets(this.context.user.id);
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
			this.setState({
				favorites: payload.setmineuser_stream,
				loaded: true
			});
		});
	}
	render() {
		var favorites = this.state.favorites;
		return (
			<Loader loaded={this.state.loaded}>
				<SetContainer sets={favorites} />
			</Loader>
		);
	}
}

Favorites.contextTypes = {
	push: React.PropTypes.func,
	user: React.PropTypes.object,
	loginStatus: React.PropTypes.bool
};
	