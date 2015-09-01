import React from 'react';
import constants from '../constants/constants';
import BrowseView from './BrowseView';
import AlphabetScroller from './AlphabetScroller';

var TITLE = 'Artists';
var TYPE = 'artist';
var Artists = React.createClass({

	componentWillMount: function() {
		this.getArtists();
	},
	componentDidMount: function() {
		$('#AlphabetScroller div').on('click', function(event) {
			event.stopPropagation();
			var letter = event.target.innerText;
			console.log(letter);
			// $('#BrowseView').scrollTo($('.browse-tile').attr(), 300);
			debugger;
		});
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
		var browseClass = 'flex-row flex view scrollable';

		return (
			<div>
				<BrowseView 
					title={TITLE}
					browseClass={browseClass}
					data={appState}
					push={push}/>
				<AlphabetScroller/>
			</div>
		);
	}

});

module.exports = Artists;