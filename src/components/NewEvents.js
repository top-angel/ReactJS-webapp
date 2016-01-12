import React from 'react';
import Loader from 'react-loader';
import {API_ROOT} from '../constants/constants';
import EventContainer from './EventContainer';

var NewEvents = React.createClass({

	getInitialState() {
		return {
			loaded: false,
			newEvents: []
		};
	},

	componentWillMount() {
		this.getNewEvents();
		mixpanel.track("New Events Page Open");
	},

	getNewEvents() {
		// var userId = this.props.appState.get('user').id;
		var userId = this.context.user.id;
		// var push = this.props.push;

		$.ajax({
			url: `${API_ROOT}setmineuser/${userId}/stream`,
			type: 'upcoming',
			data: {
				filter: 'events'
			}
		}).done(res => {
			// push({
			// 	type: 'SHALLOW_MERGE',
			// 	data: {
			// 		newEvents: res.payload.setmineuser_stream
			// 	}
			// });

			this.setState({
				newEvents: res.payload.setmineuser_stream,
				loaded: true
			});
		});
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