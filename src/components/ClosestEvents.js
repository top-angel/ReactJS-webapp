import React from 'react';
import Base from './Base';
import Loader from 'react-loader';
import EventContainer from './EventContainer';
import Location from './Location';
import api from '../services/api';

export default class ClosestEvents extends Base {
	constructor(props) {
		super(props);
		this.autoBind('handleLoad');
		this.state = {
			loaded: false
		};
	}
	handleLoad() {
		this.setState({
			loaded: true
		});
	}
	render() {
		let {appState} = this.props;
		return(
			<div>
				<Location onLoaded={this.handleLoad} />
				<Loader loaded={this.state.loaded}>
					<EventContainer events={appState.get('closestEvents')} />
				</Loader>
			</div>
		);
	}
}