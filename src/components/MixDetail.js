import React from 'react';
import Loader from 'react-loader';
import {API_ROOT} from '../constants/constants';

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
	// TODO use mix id to get mix data test: 69
		$.ajax({
			url: `${API_ROOT}'mixes/id/'${id}`,
			type: 'get',
		}).done(res => {
			this.context.push({
				type: 'SHALLOW_MERGE',
				data: {
					detailData: res.payload.mixes_id
				}
			});

			this.setState({
				loaded: true
			});
		});
	},

	render() {
		var {appState} = this.props;

		var mix = appState.get('mix');
		var loginStatus = appState.get('isUserLoggedIn');
		var user = appState.get('user');

		var setText = mix.set_count != 1 ? 'sets' : 'set';

		var detailInfo = {
			push: push,
			title: mix.event,
			imageURL: mix.icon_image.imageURL,
			info: `${mix.set_count} ${setText}`
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