import React from 'react';
import DetailView from './DetailView';
import constants from '../constants/constants';


var ActivityDetail = React.createClass({
	displayName: 'activityDetail',
	componentWillMount: function() {
		var _this = this;
		_this.getactivityData();
	},
	getactivityData: function() {
		var push = this.props.push;
		var activityId = this.props.appState.get('detailId');
		var activityData,
			activityUrl = constants.API_ROOT + 'activity/?activityId=' + activityId;

		//TODO find out the link to get a single activity
		$.ajax({
			url: activityUrl,
			type: 'get',
		})
		.done(function(response) {
			console.log(response)
			activityData = response.payload.activity;
			console.log(activityData);
			push({
				type: 'SHALLOW_MERGE',
				data: {
					detailId: activityData.id,
					detailData: activityData
				}
			});
		});
	},
	render: function() {
		var data = this.props.appState.get('detailData');
		var push = this.props.push;
		var navTitles = ['sets'];
		var info = data.sets.length + ' sets';
		var title = data.activity;
		var buttonText = 'Shuffle';
		return (
			<DetailView
				data={data}
				push={push}
				navTitles={navTitles}
				info={info}
				buttonText={buttonText}
				title={title}/>
		);
	}
});

module.exports = ActivityDetail;