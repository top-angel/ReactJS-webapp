import React from 'react';
import constants from '../constants/constants';
import ActivityTile from './ActivityTile';

var TITLE = 'Activities';
var TYPE = 'activity';
var Activities = React.createClass({

	componentWillMount: function() {
		this.getActivities();
	},
	getActivities: function() {
		var push = this.props.push;
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
		var browseClass = 'flex-row flex-fixed-4x scrollable results-container';

		var tiles = appState.map(function(tile, index) {
			return <ActivityTile
						data={tile}
						key={index}
						dataId={tile.id}
						push={push}
					/>
		});

		return (
			<div className={browseClass}>
				{tiles}
			</div>
		);
	}

});

module.exports = Activities;