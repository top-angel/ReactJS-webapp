import React from 'react';
import constants from '../constants/constants';
import SetContainer from './SetContainer';

var Favorites = React.createClass({

	componentWillMount: function() {
		this.getFavorites();
	},
	getFavorites: function() {
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
		});
	},
	render: function() {
		var favorites = this.props.appState.get('favorites');
		var containerId = 'Favorites';

		return (
			<SetContainer
				containerClass={this.props.containerClass}
				containerId={containerId}
				sets={favorites}
				push={this.props.push}
			/>
		);
	}

});

module.exports = Favorites;