import React from 'react';
import Loader from 'react-loader';
import constants from '../constants/constants';
import SetContainer from './SetContainer';

var NewSets = React.createClass({

	getInitialState: function() {
		return {
			loaded: false
		};
	},

	componentWillMount: function() {
		this.getNewSets();
	},

	getNewSets: function() {
		var _this = this;
		var userId = this.props.appState.get('user').id;
		var push = this.props.push;
		var newSets,
			newSetsUrl = constants.API_ROOT + 'user/stream/' + userId + '?filter=sets';

		$.ajax({
			url: newSetsUrl,
			type: 'get'
		})
		.done(function(response) {
			newSets = response.payload.user.stream;

			push({
				type: 'SHALLOW_MERGE',
				data: {
					newSets: newSets
				}
			});

			_this.setState({
				loaded: true
			});
		});
	},

	render: function() {
		var newSets = this.props.appState.get('newSets');
		var loginStatus = this.props.appState.get('isUserLoggedIn');
		var user = this.props.appState.get('user');

		return (
			<Loader loaded={this.state.loaded}>
				<SetContainer
					sets={newSets}
					push={this.props.push}
					loginStatus={loginStatus}
					user={user}
				/>
			</Loader>
		);
	}

});

module.exports = NewSets;