import React from 'react';
import Loader from 'react-loader';
import {API_ROOT} from '../constants/constants';
import SetContainer from './SetContainer';

var TITLE = 'Recent';
var TYPE = 'set';

var Recent = React.createClass({

	getInitialState() {
		return {
			loaded: false
		};
	},

	componentWillMount() {
		this.getRecentSets();
	},

	componentDidMount() {
		mixpanel.track("Sets Page Open");
	},

	getRecentSets() {
		var push = this.props.push;
		var recentSets,
			recentUrl = `${API_ROOT}sets/recent`

		$.ajax({
			url: recentUrl,
			type: 'get'
		})
		.done(res => {
			if(res.status === 'success') {
				recentSets = res.payload.sets_recent;
				push({
					type: 'SHALLOW_MERGE',
					data: {
						recentBrowseData: recentSets
					}
				});

				this.setState({
					loaded: true
				});
			}
		});
	},

	render() {
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