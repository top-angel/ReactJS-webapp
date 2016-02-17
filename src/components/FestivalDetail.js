import React, {PropTypes} from 'react';
import R from 'ramda';
import api from '../services/api';
import Loader from 'react-loader';
import {DEFAULT_IMAGE} from '../constants/constants';

import Base from './Base';
import SetContainer from './SetContainer';
import DetailHeader from './DetailHeader';
import ShuffleButton from './ShuffleButton';

export default class FestivalDetail extends Base {
	constructor(props) {
		super(props);
		this.autoBind('getFestival')
		this.state = {
			loaded: false,
			festival: '',
			sets: [],
			mixImage: DEFAULT_IMAGE
		};
	}
	componentWillMount() {
		this.getFestival();
		this.context.push({ currentPage: 'Festivals' });
	}
	getFestival() {
		// test 452 Ultra 2015
		api.get(`events/id/${this.props.params.festival}`).then(payload => {
			var f = payload.events_id;
			// this.context.push({ currentPage: f.event });

			this.setState({
				festival: f.event,
				setCount: f.set_count,
				sets: f.sets,
				mixImage: f.banner_image.imageURL
			});
			return f.event
		}).then(() => {
			this.setState({ loaded: true });
		});
	}
	render() {
		var setText = this.state.setCount != 1 ? 'sets' : 'set';
		var festivalInfo = `${this.state.setCount} ${setText}`;
		const setIds = R.pluck('id', this.state.sets);

		return (
			<Loader loaded={this.state.loaded}>
				<div className='detail-view'>
					<DetailHeader image={this.state.mixImage}>
						<h3>{this.state.festival}</h3>
						<h5>{festivalInfo}</h5>
						<ShuffleButton setIds={setIds} />
					</DetailHeader>
					<p className='tab'>SETS</p>
					<SetContainer sets={this.state.sets} />
				</div>
			</Loader>
		);
	}
}

FestivalDetail.contextTypes = {
	push: PropTypes.func
};