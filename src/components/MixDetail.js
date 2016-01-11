import React from 'react';
import Loader from 'react-loader';
import {API_ROOT} from '../constants/constants';

import SetContainer from './SetContainer';
import DetailImageContainer from './DetailImageContainer';

const MixDetail = React.createClass({

	displayName: 'Mix Detail Page',
	getInitialState() {
		return {
			loaded: false
		};
	},

	componentWillMount() {
		this.getMixData();
	},

	getMixData() {
		var push = this.props.push;

// TODO use mix id to get mix data test: 69
		var mixUrl = API_ROOT + 'mixes/id/' + this.props.params.mix;

		$.ajax({
			url: mixUrl,
			type: 'get',
		})
		.done(res => {
			push({
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
		var {push, appState} = this.props;

		var detailData = appState.get('detailData');
		var loginStatus = appState.get('isUserLoggedIn');
		var user = appState.get('user');

		var setText = detailData.set_count != 1 ? 'sets' : 'set';

		var detailInfo = {
			push: push,
			title: detailData.event,
			imageURL: detailData.icon_image.imageURL,
			info: `${detailData.set_count} ${setText}`
		};
		
		var sets = {
			sets: detailData.sets,
			push: push,
			loginStatus: loginStatus,
			user: user
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
					<SetContainer {...sets} />
				</div>
			</Loader>
		);
	}

});

module.exports = MixDetail;