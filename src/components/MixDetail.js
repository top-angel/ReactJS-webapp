import React, {PropTypes} from 'react';
import R from 'ramda';
import Loader from 'react-loader';
import api from '../services/api';
import {DEFAULT_IMAGE} from '../constants/constants';
import Base from './Base';
import SetContainer from './SetContainer';
import DetailImageContainer from './DetailImageContainer';

class MixDetail extends Base {
	constructor(props) {
		super(props);
		this.autoBind('getMix');
		this.state = {
			loaded: false,
			mix: '',
			sets: [],
			setCount: 0,
			icon_image: {
				imageURL: DEFAULT_IMAGE
			}
		};
		this.getMix();
	}
	getMix(id) {
		// test id 69
		api.get(`mixes/id/${id}`).then(payload => {
			let m = payload.mixes_id;
			this.context.push({ currentPage: m.event });

			this.setState({
				mix: m.event,
				setCount: m.set_count,
				imageURL: m.icon_image.imageURL,
				sets: m.sets
			});
		}).then(() => {
			this.setState({ loaded: true });
		});
	}
	render() {
		let setText = this.state.set_count != 1 ? 'sets' : 'set';
		
		let detailInfo = {
			title: this.state.mix,
			imageURL: this.state.imageURL,
			info: `${this.state.setCount} ${setText}`,
			sets: R.pluck('id', this.state.sets)
		};

		return (
			<Loader loaded={this.state.loaded}>
				<div id='detail' className='detail-page'>
					<DetailImageContainer {...detailInfo}/>
					<div className='flex-row links-container'>
						<div className='center flex-fixed'>
							SETS
						</div>
					</div>
					<SetContainer sets={this.state.sets} />
				</div>
			</Loader>
		);
	}
}

MixDetail.contextTypes = {
	push: PropTypes.func
};