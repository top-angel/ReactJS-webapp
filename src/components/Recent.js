import React from 'react';
import Loader from 'react-loader';
import constants from '../constants/constants';
import SetContainer from './SetContainer';

var TITLE = 'Recent';
var TYPE = 'set';

var Recent = React.createClass({

	getInitialState: function() {
		return {
			loaded: false
		};
	},

	componentWillMount: function() {
		 this.getRecentSets();
	},

	getRecentSets: function() {
		var _this = this;
		var push = this.props.push;
		var recentSets,
			recentUrl = constants.API_ROOT + 'recent';

		$.ajax({
			url: recentUrl,
			type: 'get'
		})
		.done(function(response) {
			recentSets = response.payload.recent;
			push({
				type: 'SHALLOW_MERGE',
				data: {
					recentBrowseData: recentSets
				}
			});

			_this.setState({
				loaded: true
			});
		});
	},
	render: function() {
		var sets = this.props.appState.get('recentBrowseData');
		var loginStatus = this.props.appState.get('isUserLoggedIn');
		var user = this.props.appState.get('user');
		var containerClass = 'flex-row scrollable tile-container';
		
		return (
			<Loader loaded={this.state.loaded}>
				<SetContainer
					push={this.props.push}
					sets={sets}
					containerClass={containerClass}
					loginStatus={loginStatus}
					user={user}
				/>
			</Loader>
		);
	}

});

module.exports = Recent;