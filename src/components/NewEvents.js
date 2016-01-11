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
		var userId = this.props.appState.get('user').id;
		var push = this.props.push;

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
		// var newEvents = this.props.appState.get('newEvents');
		var newEvents = this.state.newEvents;
		var containerClass = 'flex-row scrollable tile-container';
		
		return (
			<Loader loaded={this.state.loaded}>
				<EventContainer
					containerClass={containerClass}
					events={newEvents}
					push={this.props.push}
				/>
			</Loader>
		);
	}

});

module.exports = NewEvents;