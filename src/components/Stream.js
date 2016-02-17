import React, {PropTypes} from 'react';
import Loader from 'react-loader';
import R from 'ramda/dist/ramda.min';
import Momemt from 'moment';
import api from '../services/api';
import Base from './Base';
import SetContainer from './SetContainer';
import Recent from './Recent';

export default class Stream extends Base {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			sets: [],
			page: 1
		};
	}
	componentWillMount() {
		if(this.context.loginStatus) {
			this.getNewSets(this.context.user.id);
		}
	}
	componentWillReceiveProps(nextProps, nextContext) {
		if(nextContext.loginStatus != this.context.loginStatus) {
			this.setState({ loaded: false });
			this.getNewSets(nextContext.user.id); 
		}
	}
	getNewSets(userId) {
		api.get(`setmineuser/${userId}/stream?filter=sets`).then(payload => {
			this.setState({
				sets: payload.setmineuser_stream,
				loaded: true
			});
		});
	}
	getRecentSets(page=this.state.page) {
		api.get(`sets/recent?limit=48&page=${page}`).then(payload => {
			// TODO merge recent sets with recommended
		});
	}
	renderSets() {
		if(!this.context.loginStatus) {
			return <Recent />
		}

		return (
			<Loader loaded={this.state.loaded}>
				<SetContainer sets={this.state.sets} />
			</Loader>
		);
	}
	sortByDate(array) {
		console.log(array);

	}
	render() {
		return this.renderSets();
	}
}

Stream.contextTypes = {
	user: PropTypes.object,
	push: PropTypes.func,
	loginStatus: PropTypes.bool
};