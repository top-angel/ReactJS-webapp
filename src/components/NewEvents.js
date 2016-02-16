import React, {PropTypes} from 'react';
import Loader from 'react-loader';
import api from '../services/api';
import Base from './Base';
import EventContainer from './EventContainer';
const {object, func} = PropTypes;

export default class NewEvents extends Base {
	constructor(props) {
		super(props);
		this.autoBind('getNewEvents');
		this.state = {
			loaded: false,
			events: []
		};
	}
	componentWillMount() {
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
	user: object,
	push: func
};