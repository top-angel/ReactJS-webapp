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

		var detailInfo = {
			appState: appState,
			push: push,
			title: data.activity,
			buttonText: 'Recommend',
			pageType: 'activity',
			imageURL: data.imageURL,
			info: data.sets.length+' sets'
		};

		var setProps = {
			sets: data.sets,
			push: push
		};

		return (
			<Loader loaded={this.state.loaded}>
				<div id='detail' className='view detail-page'>
					<DetailImageContainer {...detailInfo}/>
					<div className='divider'/>
					<div className="flex-row links-container">
						<div className='center flex-fixed'>
							sets
						</div>
					</div>
					<SetContainer {...setProps} />
				</div>
			</Loader>
		);
	}

});

module.exports = ActivityDetail;