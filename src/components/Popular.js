import React from 'react';
import Loader from 'react-loader';
import {API_ROOT} from '../constants/constants';
import SetContainer from './SetContainer';

var TITLE = 'Popular';
var TYPE = 'set';
var Popular = React.createClass({

	getInitialState() {
		return {
			loaded: false
		};
	},

	componentWillMount() {
		this.getPopularSets();
	},

	componentDidMount() {
		mixpanel.track("Popular Sets Page Open");
	},

	getPopularSets() {
		var push = this.props.push;
		var results,
			popularUrl = `${API_ROOT}sets/popular`;

		$.ajax({
			url: popularUrl,
			type: 'get'
		})
		.done(res => {
			if(res.status === 'success') {
				results = res.payload.sets_popular;
				push({
					type: 'SHALLOW_MERGE',
					data: {
						popularBrowseData: results
					}
				});

				this.setState({
					loaded: true
				});
			}
		});
	},

	render() {
		var sets = this.props.appState.get('popularBrowseData');
		var loginStatus = this.props.appState.get('isUserLoggedIn');
		var user = this.props.appState.get('user');
		var containerClass = 'flex-row scrollable';
		var push = this.props.push;
		
		return (
			<Loader loaded={this.state.loaded}>
				<SetContainer
					push={push}
					sets={sets}
					containerClass={containerClass}
					loginStatus={loginStatus}
					user={user}
				/>
			</Loader>
		);
	}

});

module.exports = Popular;