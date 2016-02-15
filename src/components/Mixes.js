import React from 'react';
import R from 'ramda';
import Loader from 'react-loader';
import api from '../services/api';
import {filterWithoutSets} from '../services/utilities';

import Base from './Base';
import MixContainer from './MixContainer';
import Spinner from './Spinner';

export default class Mixes extends Base {
	constructor(props) {
		super(props);
		this.autoBind('getMixes', 'onScroll');
		this.state = {
			loaded: false,
			mixes: [],
			page: 1
		};
	}
	componentWillMount() {
		this.getMixes(this.state.page);
	}
	componentDidMount() {
		mixpanel.track("Mixes Page Open");
	}
	getMixes(page=1) {
		api.get(`mixes?limit=48&page=${page}`).then(payload => {
			let mixes = filterWithoutSets(payload.mixes);
			mixes = this.state.mixes.concat(mixes);
			mixes = R.uniq(mixes);

			this.setState({
				loaded: true,
				mixes: mixes,
				page: page + 1
			});
		});
	}
	onScroll() {
		console.log(this.state.page);
		this.getMixes(this.state.page);
	}
	render() {
		return (
			<Loader loaded={this.state.loaded}>
				<MixContainer mixes={this.state.mixes} onScroll={this.onScroll}/>
				<Spinner />
			</Loader>
		);
	}
}