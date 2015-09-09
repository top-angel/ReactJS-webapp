import React from 'react';
import Loader from 'react-loader';
import constants from '../constants/constants';
import SetContainer from './SetContainer';

var Favorites = React.createClass({

	getInitialState: function() {
		return {
			loaded: false
		};
	},
	componentWillMount: function() {
		this.getFavorites();
	},
	getFavorites: function() {
		var _this = this;
		var userId = this.props.appState.get('userId');
		var push = this.props.push;
		var results,
			favoritesUrl = constants.API_ROOT + 'user/stream/' + userId + '?filter=favorites';

		$.ajax({
			url: favoritesUrl,
			type: 'get'
		})
		.done(function(response) {
			results = response.payload.user.favorites;

			push({
				type: 'SHALLOW_MERGE',
				data: {
					favorites: results
				}
			});

			_this.setState({
				loaded: true
			});
		});
	},
	render: function() {
		var favorites = this.props.appState.get('favorites');
		var containerId = 'Favorites';

		return (
			<Loader loaded={this.state.loaded}>
				<SetContainer
					containerId={containerId}
					sets={favorites}
					push={this.props.push}
				/>
			</Loader>
		);
	}

});

module.exports = Favorites;