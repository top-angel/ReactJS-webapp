import React from 'react';
import Loader from 'react-loader';
import constants from '../constants/constants';
import SetContainer from './SetContainer';

var TITLE = 'Popular';
var TYPE = 'set';
var Popular = React.createClass({

	getInitialState: function() {
		return {
			loaded: false
		};
	},

	componentWillMount: function() {
		this.getPopularSets();
	},

	componentDidMount: function() {
		mixpanel.track("Popular Sets Page Open");
	},

	getPopularSets: function() {
		var _this = this;
		var push = this.props.push;
		var results,
			popularUrl = constants.API_ROOT + 'popular';

		$.ajax({
			url: popularUrl,
			type: 'get'
		})
		.done(function(response) {
			results = response.payload.popular;
			push({
				type: 'SHALLOW_MERGE',
				data: {
					popularBrowseData: results
				}
			});

			_this.setState({
				loaded: true
			});
		});
	},

	render: function() {
		var data = this.props.appState.get('popularBrowseData');
		var loginStatus = this.props.appState.get('isUserLoggedIn');
		var user = this.props.appState.get('user');
		var containerClass = 'flex-row scrollable';
		var push = this.props.push;
		
		return (
			<Loader loaded={this.state.loaded}>
				<SetContainer
					push={push}
					sets={data}
					containerClass={containerClass}
					loginStatus={loginStatus}
					user={user}
				/>
			</Loader>
		);
	}

});

module.exports = Popular;