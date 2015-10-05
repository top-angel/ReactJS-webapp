import React from 'react';
import Loader from 'react-loader';
import constants from '../constants/constants';

import SetContainer from './SetContainer';
import DetailImageContainer from './DetailImageContainer';

var ActivityDetail = React.createClass({

	displayName: 'activityDetail',
	getInitialState: function() {
		return {
			loaded: false
		};
	},

	componentWillMount: function() {
		this.getactivityData();
	},

	getactivityData: function() {
		var _this = this;
		var push = this.props.push;
		var activity = this.props.params.activity;

		var activityData,
			activityUrl = constants.API_ROOT + 'activity/?activityId=' + activity;

		$.ajax({
			url: activityUrl,
			type: 'get',
		})
		.done(function(response) {
			activityData = response.payload.activity;

			push({
				type: 'SHALLOW_MERGE',
				data: {
					detailId: activityData.id,
					detailData: activityData
				}
			});

			_this.setState({
				loaded: true
			});
		});
	},

	render: function() {
		var appState = this.props.appState;
		var push = this.props.push;

		var data = appState.get('detailData');
		var loginStatus = this.props.appState.get('isUserLoggedIn');
		var user = this.props.appState.get('user');
		var setText = data.sets.length > 1 ? ' sets' : ' set';

		var detailInfo = {
			appState: appState,
			push: push,
			title: data.activity,
			buttonText: 'Recommend',
			pageType: 'activity',
			imageURL: data.banner_imageURL,
			info: data.sets.length+ setText
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

module.exports = ActivityDetail;