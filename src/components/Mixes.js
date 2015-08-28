import React from 'react';
import constants from '../constants/constants';
import BrowseView from './BrowseView';

var TITLE = 'Mixes';
var TYPE = 'mix';
var Mixes = React.createClass({

	componentDidMount: function() {
		 this.getMixes();
	},
	getMixes: function() {
		var push = this.props.push;
		var results,
			mixUrl = constants.API_ROOT + 'mix';

		$.ajax({
			url: mixUrl,
			type: 'get'
		})
		.done(function(response) {
			results = response.payload.mix;
			console.log(results);
			push({
				type: 'SHALLOW_MERGE',
				data: {
					browseData: {
						mixes: results
					}
				}
			});
		});
	},
	render: function() {

		var appState = this.props.appState.get('browseData');
		var data = appState.mixes;
		return (
			<BrowseView title={TITLE} data={data} type={TYPE}/>
		);
	}

});

module.exports = Mixes;