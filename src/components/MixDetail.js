import React from 'react';
import R from 'ramda';
import Loader from 'react-loader';
import api from '../services/api';
import {DEFAULT_IMAGE} from '../constants/constants';

import SetContainer from './SetContainer';
import DetailImageContainer from './DetailImageContainer';

const MixDetail = React.createClass({
	getInitialState() {
		return {
			loaded: false,
			mix: '',
			sets: [],
			setCount: 0,
			icon_image: {
				imageURL: DEFAULT_IMAGE
			}
		};
	},

	componentWillMount() {
		this.getMixData(this.props.params.mix);
	},

	getMixData(id) {
		// test id 69
		api.get(`mixes/id/${id}`).then(res => {
			var m = res.mixes_id
			this.setState({
				mix: m.event,
				setCount: m.set_count,
				imageURL: m.icon_image.imageURL,
				sets: m.sets
			});
		}).then(() => {
			this.setState({ loaded: true })
		})
	},

	render() {
		var setText = this.state.set_count != 1 ? 'sets' : 'set';

		var detailInfo = {
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

});

export default MixDetail;