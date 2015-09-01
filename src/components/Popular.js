import React from 'react';
import constants from '../constants/constants';
import SetContainer from './SetContainer';

var TITLE = 'Popular';
var TYPE = 'set';
var Popular = React.createClass({

	componentWillMount: function() {
		 this.getPopularSets();
	},
	getPopularSets: function() {
		var push = this.props.push;
		console.log(push);
		var results,
			popularUrl = constants.API_ROOT + 'popular';

		$.ajax({
			url: popularUrl,
			type: 'get'
		})
		.done(function(response) {
			results = response.payload.popular;
			push({
				type: 'SHALLOW_MERGE',
				data: {
					popularBrowseData: results
				}
			});
		});
	},
	render: function() {
		var data = this.props.appState.get('popularBrowseData');
		var push = this.props.push;
		var setClass = 'flex-row flex-fixed-4x scrollable';
		
		return (
			<SetContainer
				push={push}
				data={data}
				setClass={setClass}/>
		);
	}

});

module.exports = Popular;