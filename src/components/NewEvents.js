import React from 'react';
import Loader from 'react-loader';
import api from '../services/api';
import EventContainer from './EventContainer';

var NewEvents = React.createClass({
	displayName: 'Recommended Events',
	contextTypes: {
		user: React.PropTypes.object,
		push: React.PropTypes.func
	},

	getInitialState() {
		return {
			loaded: false,
			newEvents: []
		};
	},

	componentDidMount() {
		mixpanel.track("New Events Page Open");
	},

	componentWillMount() {
		this.getNewEvents();
	},

	getNewEvents() {
		var userId = this.context.user.id;
		api.get(`setmineuser/${userId}/stream?filter=events`).then(res => {
			this.setState({
				newEvents: res.setmineuser_stream,
				loaded: true
			})
		})
	},

	render() {
		return (
			<Loader loaded={this.state.loaded}>
				<EventContainer events={this.state.newEvents} />
			</Loader>
		);
	}

});

export default NewEvents;