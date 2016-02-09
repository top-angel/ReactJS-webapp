import React, {PropTypes, Component} from 'react';
import Loader from 'react-loader';
import api from '../services/api';
import EventContainer from './EventContainer';

export default class NewEvents extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			events: []
		};
		this.getNewEvents();
	}
	componentDidMount() {
		mixpanel.track("New Events Page Open");
	}
	getNewEvents() {
		var userId = this.context.user.id;
		api.get(`setmineuser/${userId}/stream?filter=events`).then(payload => {
			this.setState({
				events: payload.setmineuser_stream,
				loaded: true
			});
		});
	}
	render() {
		return (
			<Loader loaded={this.state.loaded}>
				<EventContainer events={this.state.events} />
			</Loader>
		);
	}
}

NewEvents.contextTypes = {
	user: PropTypes.object,
	push: PropTypes.func
};