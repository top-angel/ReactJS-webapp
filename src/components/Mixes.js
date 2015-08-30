import React from 'react';
import constants from '../constants/constants';
import BrowseView from './BrowseView';

var TITLE = 'Mixes';
var TYPE = 'mix';
var Mixes = React.createClass({

	componentWillMount: function() {
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
			push({
				type: 'SHALLOW_MERGE',
				data: {
					mixBrowseData: results
				}
			});
		});
	},
	render: function() {

		var appState = this.props.appState.get('mixBrowseData');
		return (
			<BrowseView title={TITLE} data={appState} type={TYPE}/>
		);
	}

});

module.exports = Mixes;