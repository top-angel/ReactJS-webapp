import React from 'react';
import constants from '../constants/constants';
import BrowseView from './BrowseView';

var TITLE = 'Activities';
var TYPE = 'activity';
var Activities = React.createClass({

	componentWillMount: function() {
		this.getActivities();
	},
	getActivities: function() {
		var push = this.props.push;
		console.log(push);
		var results,
			activityUrl = constants.API_ROOT + 'activity';

		$.ajax({
			url: activityUrl,
			type: 'get'
		})
		.done(function(response) {
			results = response.payload.activity;
			push({
				type: 'SHALLOW_MERGE',
				data: {
					activityBrowseData: results
				}
			});
		});
	},
	render: function() {
		var push = this.props.push;
		var appState = this.props.appState.get('activityBrowseData');
		return (
			<BrowseView title={TITLE} push={push} data={appState} type={TYPE}/>
		);
	}

});

module.exports = Activities;