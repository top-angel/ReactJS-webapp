import React, {PropTypes} from 'react';
import R from 'ramda';
import Loader from 'react-loader';
import api from '../services/api';
import {DEFAULT_IMAGE} from '../constants/constants';

import Base from './Base';
import SetContainer from './SetContainer';
import DetailHeader from './DetailHeader';
import ShuffleButton from './ShuffleButton';

export default class MixDetail extends Base {
	constructor(props) {
		super(props);
		this.autoBind('getMix');
		this.state = {
			loaded: false,
			mix: '',
			sets: [],
			setCount: 0,
			mixImage: DEFAULT_IMAGE
		};
	}
	componentWillMount() {
		this.getMix();
		this.context.push({ currentPage: 'Mixes' });
	}
	getMix() {
		// test id 69
		api.get(`mixes/id/${this.props.params.mix}`).then(payload => {
			let m = payload.mixes_id;
			// this.context.push({ currentPage: m.event });

			this.setState({
				mix: m.event,
				setCount: m.set_count,
				mixImage: m.icon_image.imageURL,
				sets: m.sets
			});
		}).then(() => {
			this.setState({ loaded: true });
		});
	}
	render() {
		let setText = this.state.set_count != 1 ? 'sets' : 'set';
		const setIds = R.pluck('id', this.state.sets);

		return (
			<Loader loaded={this.state.loaded}>
				<div className='detail-view'>
					<DetailHeader image={this.state.mixImage}>
						<h3>{this.state.mix}</h3>
						<h5>{this.state.setCount + ' ' + setText}</h5>
						<ShuffleButton setIds={setIds} />
					</DetailHeader>
					<p className='tab'>SETS</p>
					<SetContainer sets={this.state.sets} />
				</div>
			</Loader>
		);
	}
}

MixDetail.contextTypes = {
	push: PropTypes.func
};