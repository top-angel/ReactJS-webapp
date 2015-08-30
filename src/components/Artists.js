import React from 'react';
import constants from '../constants/constants';
import BrowseView from './BrowseView';

var TITLE = 'Artists';
var TYPE = 'artist';
var Artists = React.createClass({

	componentWillMount: function() {
		this.getArtists();
	},
	getArtists: function() {
		var push = this.props.push;
		var results,
			artistUrl = constants.API_ROOT + 'artist';

		$.ajax({
			url: artistUrl,
			type: 'get'
		})
		.done(function(response) {
			results = response.payload.artist;
			push({
				type: 'SHALLOW_MERGE',
				data: {
					artistBrowseData: results
				}
			});
		});
	},
	render: function() {
		var appState = this.props.appState.get('artistBrowseData');
		var push = this.props.push;
		return (
			<BrowseView 
				title={TITLE}
				data={appState}
				push={push}/>
		);
	}

});

module.exports = Artists;