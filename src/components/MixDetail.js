import React from 'react';
import Loader from 'react-loader';
import {API_ROOT} from '../constants/constants';

import SetContainer from './SetContainer';
import DetailImageContainer from './DetailImageContainer';

var MixDetail = React.createClass({

	displayName: 'MixDetail',
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
		var mix = this.props.params.mix;
		var query = mix.split('-').join('%20');

		// TODO write backend route for getting mix by id
		var mixData,
			mixUrl = API_ROOT + 'mixes/search/' + query;

		$.ajax({
			url: mixUrl,
			type: 'get',
		})
		.done(res => {
			mixData = res.payload.mix;

			push({
				type: 'SHALLOW_MERGE',
				data: {
					detailId: mixData.id,
					detailData: mixData
				}
			});

			this.setState({
				loaded: true
			});
		});
	},

	render() {
		var push = this.props.push;
		var appState = this.props.appState;

		var data = appState.get('detailData');
		var loginStatus = this.props.appState.get('isUserLoggedIn');
		var user = this.props.appState.get('user');
		var setText = data.sets.length > 1 ? ' sets' : ' set';

		var detailInfo = {
			appState: appState,
			push: push,
			title: data.event,
			buttonText: 'Shuffle',
			imageURL: data.imageURL,
			info: data.sets.length + setText
		};
		
		var setProps = {
			sets: data.sets,
			push: push,
			loginStatus: loginStatus,
			user: user
		};

		return (
			<Loader loaded={this.state.loaded}>
				<div id='detail' className='view detail-page'>
					<DetailImageContainer {...detailInfo}/>
					<div className="flex-row links-container">
						<div className='center flex-fixed'>
							SETS
						</div>
					</div>
					<SetContainer {...setProps} />
				</div>
			</Loader>
		);
	}

});

module.exports = MixDetail;