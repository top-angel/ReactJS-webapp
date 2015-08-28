import React from 'react';
import constants from '../constants/constants';
import BrowseView from './BrowseView';

var TITLE = 'Festivals';
var TYPE = 'event';
var Festivals = React.createClass({

	componentDidMount: function() {
		 this.getFestivals();
	},
	getFestivals: function() {
		var push = this.props.push;
		console.log(push);
		var results,
			festivalUrl = constants.API_ROOT + 'festival';

		$.ajax({
			url: festivalUrl,
			type: 'get'
		})
		.done(function(response) {
			results = response.payload.festival;
			console.log(results);
			push({
				type: 'SHALLOW_MERGE',
				data: {
					browseData: {
						festivals: results
					}
				}
			});
		});
	},
	render: function() {
		var appState = this.props.appState.get('browseData');
		var data = appState.festivals;
		return (
			<BrowseView title={TITLE} data={data} type={TYPE}/>
		);
	}

});

module.exports = Festivals;