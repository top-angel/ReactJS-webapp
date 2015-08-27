import React from 'react';
import constants from '../constants/constants';
import BrowseView from './BrowseView';

var TITLE = 'Artists';
var Artists = React.createClass({

	componentDidMount: function() {
		this.getArtists();
	},
	getArtists: function() {
		var push = this.props.push;
		console.log(push);
		var results,
			artistUrl = constants.API_ROOT + 'artist';

		$.ajax({
			url: artistUrl,
			type: 'get'
		})
		.done(function(response) {
			results = response.payload.artist;
			console.log(results);
			push({
				type: 'SHALLOW_MERGE',
				data: {
					browseData: {
						artists: results
					}
				}
			});
		});
	},
	render: function() {
		var appState = this.props.appState.get('browseData');
		var data = appState.artists;
		return (
			<BrowseView title={TITLE} data={data}/>
		);
	}

});

module.exports = Artists;