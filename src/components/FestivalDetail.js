import React, {PropTypes} from 'react';
import R from 'ramda';
import api from '../services/api';
import Loader from 'react-loader';
import {DEFAULT_IMAGE} from '../constants/constants';
import Base from './Base';
import SetContainer from './SetContainer';
import DetailImageContainer from './DetailImageContainer';

export default class FestivalDetail extends Base {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			festival: '',
			sets: [],
			imageURL: DEFAULT_IMAGE
		};
		this.getFestival();
	}
	getFestivalData(id) {
		// test 452 Ultra 2015
		api.get(`events/id/${id}`).then(payload => {
			var f = payload.events_id;
			this.context.push({ currentPage: f.event });

			this.setState({
				festival: f.event,
				setCount: f.set_count,
				sets: f.sets,
				imageURL: f.banner_image.imageURL
			});
			return f.event
		}).then(() => {
			this.setState({ loaded: true });
		});
	}
	render() {
		var setText = this.state.setCount != 1 ? 'sets' : 'set';
		var festivalInfo = `${this.state.setCount} ${setText}`;

		var detailInfo = {
			title: this.state.festival,
			info: festivalInfo,
			imageURL: this.state.imageURL,
			sets: R.pluck('id', this.state.sets)
		};

		return (
			<Loader loaded={this.state.loaded}>
				<div id='detail' className='view detail-page'>
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

FestivalDetail.contextTypes = {
	push: PropTypes.func
};