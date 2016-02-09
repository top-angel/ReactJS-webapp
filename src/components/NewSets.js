import React, {PropTypes, Component} from 'react';
import Loader from 'react-loader';
import api from '../services/api';
import SetContainer from './SetContainer';

export default class NewSets extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			sets: []
		};
		this.getNewSets();
	}
	componentDidMount() {
		mixpanel.track("New Events Page Open");
	}
	getNewSets() {
		var userId = this.context.user.id;
		api.get(`setmineuser/${userId}/stream?filter=sets`).then(payload => {
			this.setState({
				sets: payload.setmineuser_stream,
				loaded: true
			});
		});
	}
	render() {
		return (
			<Loader loaded={this.state.loaded}>
				<SetContainer sets={this.state.sets} />
			</Loader>
		);
	}
}

NewSets.contextTypes = {
	user: PropTypes.object,
	push: PropTypes.func
};