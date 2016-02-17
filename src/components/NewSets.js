import React, {PropTypes} from 'react';
import Loader from 'react-loader';
import R from 'ramda/dist/ramda.min';
import api from '../services/api';
import Base from './Base';
import SetContainer from './SetContainer';

export default class NewSets extends Base {
	constructor(props) {
		super(props);
		this.autoBind('getNewSets');
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
	renderSets() {
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

NewSets.contextTypes = {
	user: PropTypes.object,
	push: PropTypes.func,
	loginStatus: PropTypes.bool
};