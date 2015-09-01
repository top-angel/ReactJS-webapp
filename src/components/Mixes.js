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
		var browseClass='flex-row flex-fixed-4x scrollable';
		var push = this.props.push;
		var appState = this.props.appState.get('mixBrowseData');
		return (
			<BrowseView
				title={TITLE}
				push={push}
				data={appState}
				type={TYPE}
				browseClass={browseClass}/>
		);
	}

});

module.exports = Mixes;