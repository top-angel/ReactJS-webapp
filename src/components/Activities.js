import React from 'react';
import constants from '../constants/constants';
import BrowseView from './BrowseView';

var TITLE = 'Activities';
var TYPE = 'activity';
var Activities = React.createClass({

	componentDidMount: function() {
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
			console.log(results);
			push({
				type: 'SHALLOW_MERGE',
				data: {
					browseData: {
						activities: results
					}
				}
			});
		});
	},
	render: function() {

		var appState = this.props.appState.get('browseData');
		var data = appState.activities;
		return (
			<BrowseView title={TITLE} data={data} type={TYPE}/>
		);
	}

});

module.exports = Activities;