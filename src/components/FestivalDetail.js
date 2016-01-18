import React from 'react';
import R from 'ramda';
import api from '../services/api';
import Loader from 'react-loader';
import {DEFAULT_IMAGE} from '../constants/constants';

import SetContainer from './SetContainer';
import DetailImageContainer from './DetailImageContainer';

const FestivalDetail = React.createClass({
	getInitialState() {
		return {
			loaded: false,
			festival: '',
			sets: [],
			imageURL: DEFAULT_IMAGE
		};
	},

	componentWillMount() {
		this.getFestivalData(this.props.params.festival);
	},

	getFestivalData(id) {
		// test 452 Ultra 2015
		api.get(`events/id/${id}`).then(res => {
			var f = res.events_id
			this.setState({
				festival: f.event,
				setCount: f.set_count,
				sets: f.sets,
				imageURL: f.banner_image.imageURL
			});
		}).then(() => {
			this.setState({ loaded: true })
		})
	},

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
});

export default FestivalDetail;