import React from 'react';
import R from 'ramda';
import api from '../services/api';
import Loader from 'react-loader';

import SetContainer from './SetContainer';
import DetailImageContainer from './DetailImageContainer';

const FestivalDetail = React.createClass({
	contextTypes: {
		push: React.PropTypes.func
	},

	getInitialState() {
		return {
			loaded: false
		};
	},

	componentWillMount() {
		this.getFestivalData(this.props.params.festival);
	},

	getFestivalData(id) {
		// test 452 Ultra 2015
		api.get(`events/id/${id}`).then(res => {
			this.context.push({
				type: 'SHALLOW_MERGE',
				data: {
					detailData: res.events_id
				}
			})
		}).then(() => {
			this.setState({ loaded: true })
		})
	},

	render() {
		var festival = this.props.appState.get('detailData');

		var setText = festival.set_count != 1 ? 'sets' : 'set';
		var festivalInfo = `${festival.set_count} ${setText}`;

		var detailInfo = {
			title: festival.event,
			info: festivalInfo,
			imageURL: festival.banner_image.imageURL,
			sets: R.pluck('id', festival.sets)
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
					<SetContainer sets={festival.sets} />
				</div>
			</Loader>
		);
	}
});

export default FestivalDetail;