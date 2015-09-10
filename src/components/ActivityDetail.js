import React from 'react';
import Loader from 'react-loader';
import DetailView from './DetailView';
import constants from '../constants/constants';

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
		var activityId = this.props.appState.get('detailId');
		var activityData,
			activityUrl = constants.API_ROOT + 'activity/?activityId=' + activityId;

		//TODO find out the link to get a single activity
		$.ajax({
			url: activityUrl,
			type: 'get',
		})
		.done(function(response) {
			activityData = response.payload.activity;
			console.log(activityData);

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
		var data = this.props.appState.get('detailData');
		var push = this.props.push;
		var navTitles = [
			{
				title: 'sets',
				to: 'activity-sets'
			}
		];
		var info = data.sets.length + ' sets';
		var title = data.activity;
		var buttonText = 'Recommend';

		return (
			<Loader loaded={this.state.loaded}>
				<DetailView
					navTitles={navTitles}
					push={push}
					data={data}
					info={info}
					title={title}
					buttonText={buttonText} />
			</Loader>
		);
	}

});

module.exports = ActivityDetail;