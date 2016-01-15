import React from 'react';
import R from 'ramda';
import Loader from 'react-loader';
import api from '../services/api';

import SetContainer from './SetContainer';
import DetailImageContainer from './DetailImageContainer';

const MixDetail = React.createClass({
	contextTypes: {
		push: React.PropTypes.func
	},

	getInitialState() {
		return {
			loaded: false
		};
	},

	componentWillMount() {
		this.getMixData(this.props.params.mix);
	},

	getMixData(id) {
		// test id 69
		api.get(`mixes/id/${id}`).then(res => {
			this.context.push({
				type: 'SHALLOW_MERGE',
				data: {
					detailData: res.mixes_id
				}
			})
		}).then(() => {
			this.setState({ loaded: true })
		})
	},

	render() {
		var mix = this.props.appState.get('detailData');
		var setText = mix.set_count != 1 ? 'sets' : 'set';

		var detailInfo = {
			title: mix.event,
			imageURL: mix.icon_image.imageURL,
			info: `${mix.set_count} ${setText}`,
			sets: R.pluck('id', mix.sets)
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
					<SetContainer sets={mix.sets} />
				</div>
			</Loader>
		);
	}

});

export default MixDetail;