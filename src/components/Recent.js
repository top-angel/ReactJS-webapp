import React from 'react';
import Base from './Base';
import Loader from 'react-loader';
import api from '../services/api';
import SetContainer from './SetContainer';
import Spinner from './Spinner';
import R from 'ramda';

export default class Recent extends Base {
	constructor(props) {
		super(props);
		this.autoBind('getRecentSets', 'onScroll');
		this.state = {
			loaded: false,
			sets: [],
			page: 1
		};
	}
	componentWillMount() {
		this.getRecentSets();
	}
	componentDidMount() {
		mixpanel && mixpanel.track("Sets Page Open");
	}
	getRecentSets(page=this.state.page) {
		api.get(`sets/recent?limit=48&page=${page}`).then(payload => {
			// merge sets to existing sets
			let sets = this.state.sets.concat(payload.sets_recent);
			sets = R.uniq(sets);

			this.setState({
				loaded: true,
				sets: sets,
				page: page + 1
			});
		});
	}
	onScroll() {
		this.getRecentSets(this.state.page);
	}
	render() {
		return (
			<Loader loaded={this.state.loaded}>
				<SetContainer sets={this.state.sets} onScroll={this.onScroll}/>
				<Spinner />
			</Loader>
		);
	}
}