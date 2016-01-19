import React from 'react';
import Loader from 'react-loader';
import constants from '../constants/constants';
import ActivityTile from './ActivityTile';

var TITLE = 'Activities';
var TYPE = 'activity';
var Activities = React.createClass({

	getInitialState() {
		return {
			loaded: false
		};
	},

	componentWillMount() {
		this.getActivities();
	},

	componentDidMount() {
		mixpanel.track("Activities Page Open");
	},

	getActivities() {
		var push = this.props.push;
		var results,
			activityUrl = 'https://setmine.com/api/v/8/activity/';

		$.ajax({
			url: activityUrl,
			type: 'get'
		})
		.done(res => {
			if(res.status === 'success') {
				results = res.payload.activity;
				push({
					type: 'SHALLOW_MERGE',
					data: {
						activityBrowseData: results
					}
				});

				this.setState({
					loaded: true
				});
			}
		});
	},
	
	render() {
		var push = this.props.push;
		var appState = this.props.appState.get('activityBrowseData');
		var containerClass = 'flex-row scrollable tile-container';

		var tiles = appState.map((activity, index) => {
			var props = {
				activity: activity.activity,
				key: index,
				id: activity.id,
				set_ids: activity.set_ids,
				imageURL: constants.S3_ROOT_FOR_IMAGES + activity.imageURL,
				bannerImageUrl: constants.S3_ROOT_FOR_IMAGES + "small_" + activity.banner_imageURL,
				push: push
			}
			
			return <ActivityTile {...props} />
		});

		return (
			<Loader loaded={this.state.loaded}>
				<div className={containerClass}>
					{tiles}
				</div>
			</Loader>
		);
	}

});

module.exports = Activities;