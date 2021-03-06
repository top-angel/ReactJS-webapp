import React from 'react';
import Base from './Base';
import Loader from 'react-loader';
import api from '../services/api';
import SetContainer from './SetContainer';
import Spinner from './Spinner';
import R from 'ramda';

export default class Popular extends Base {
	constructor(props) {
		super(props);
		this.autoBind('getPopularSets', 'onScroll');
		this.state = {
			loaded: false,
			sets: [],
			page: 1
		};
	}
	componentWillMount() {
		this.getPopularSets();
	}
	componentDidMount() {
		mixpanel && mixpanel.track("Popular Sets Page Open");
	}
	getPopularSets(page=this.state.page) {
		api.get(`sets/popular?limit=48&page=${page}`).then(res => {
			// merge new sets to existing
			let sets = this.state.sets.concat(res.sets_popular);
			sets = R.uniq(sets);
			
			this.setState({
				loaded: true,
				sets: sets,
				page: page + 1
			});
		});
	}
	onScroll() {
		this.getPopularSets(this.state.page);
	}
	render() {
		return (
			<Loader loaded={this.state.loaded}>
				<SetContainer sets={this.state.sets} onScroll={this.onScroll} />
				<Spinner />
			</Loader>
		);
	}
}