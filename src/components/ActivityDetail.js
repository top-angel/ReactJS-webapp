import React from 'react';
import Loader from 'react-loader';
import constants from '../constants/constants';

import SetContainer from './SetContainer';
import DetailImageContainer from './DetailImageContainer';

var ActivityDetail = React.createClass({

	displayName: 'activityDetail',
	getInitialState() {
		return {
			loaded: false
		};
	},

	componentWillMount() {
		this.getactivityData();
	},

	getactivityData() {
		var push = this.props.push;
		var activity = this.props.params.activity;

		var activityData,
			activityUrl = 'https://setmine.com/api/v/8/activity/';

		$.ajax({
			url: activityUrl,
			type: 'get',
			data: {
				activityId: activity
			}
		})
		.done(res => {
			activityData = res.payload.activity;
			push({
				type: 'SHALLOW_MERGE',
				data: {
					detailId: activityData.id,
					detailData: activityData
				}
			});

			this.setState({
				loaded: true
			});
		});
	},

	render() {
		var appState = this.props.appState;
		var push = this.props.push;

		var data = appState.get('detailData');
		console.log(data);
		var loginStatus = appState.get('isUserLoggedIn');
		var user = appState.get('user');
		var setText = data.sets.length != 1 ? ' sets' : ' set';

		var detailInfo = {
			appState: appState,
			push: push,
			title: data.activity,
			buttonText: 'Recommend',
			pageType: 'activity',
			imageURL: data.banner_imageURL,
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

module.exports = ActivityDetail;