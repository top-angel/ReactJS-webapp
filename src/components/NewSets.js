import React from 'react';
import Loader from 'react-loader';
import {API_ROOT} from '../constants/constants';
import SetContainer from './SetContainer';

var NewSets = React.createClass({

	contextTypes: {
		push: React.PropTypes.func,
		user: React.PropTypes.object
	},

	getInitialState() {
		return {
			loaded: false,
			newSets: []
		};
	},

	componentWillMount() {
		this.getNewSets();
		mixpanel.track("New Sets Page Open");
	},

	getNewSets() {
		// var userId = this.props.appState.get('user').id;
		// var push = this.props.push;
		var userId = this.context.user.id

		$.ajax({
			url: `${API_ROOT}setmineuser/${userId}/stream`,
			type: 'get',
			data: {
				filter: 'sets'
			}
		}).done(res => {
			// push({
			// 	type: 'SHALLOW_MERGE',
			// 	data: {
			// 		newSets: res.payload.setmineuser_stream
			// 	}
			// });

			this.setState({
				newSets: res.payload.setmineuser_stream,
				loaded: true
			});
		});
	},

	render() {
		// var newSets = this.props.appState.get('newSets');
		// var loginStatus = this.props.appState.get('isUserLoggedIn');
		// var user = this.props.appState.get('user');

		return (
			<Loader loaded={this.state.loaded}>
				<SetContainer sets={this.state.newSets} />
			</Loader>
		);
	}

});

export default NewSets;