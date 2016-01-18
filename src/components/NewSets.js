import React from 'react';
import Loader from 'react-loader';
import api from '../services/api';
import SetContainer from './SetContainer';

var NewSets = React.createClass({
	displayName: 'Recommended Sets',
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

	componentDidMount() {
		mixpanel.track("New Sets Page Open");
	},

	componentWillMount() {
		this.getNewSets();
	},

	getNewSets() {
		var userId = this.context.user.id
		api.get(`setmineuser/${userId}/stream?filter=sets`).then(res => {
			this.setState({
				newSets: res.setmineuser_stream,
				loaded: true
			})
		})
	},

	render() {
		return (
			<Loader loaded={this.state.loaded}>
				<SetContainer sets={this.state.newSets} />
			</Loader>
		);
	}
});

export default NewSets;