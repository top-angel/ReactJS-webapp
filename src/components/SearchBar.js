import React from 'react';
import {History} from 'react-router';
import constants from '../constants/constants';
import _ from 'underscore';

var SearchBar = React.createClass({

	mixins: [History],

	handleKeypress(e) {
		var query = document.getElementById('search').value;
		if(query.length >= 3 || e.charCode == 13) {
			this.search(query);
		} 
	},

	search(query) {
		var self = this;
		var push = this.props.push;
		var activeSearchAjax = null;
		var results, 
			searchUrl = constants.API_ROOT + 'search/' + query;

		$.ajax({
			url: searchUrl,
			type: 'get'
		})
		.done(function(response) {
			results = response.payload.search;
			var sets = results.sets;
			var events = results.upcomingEvents;
			var tracks = results.tracks;

			push({
				type: 'SHALLOW_MERGE',
				data: {
					searchResults: {
						sets: sets,
						upcomingEvents: events,
						tracks: tracks
					}
				}
			});

			self.history.pushState(null, '/search');
		});
	},
	
	render() {
		return (
			<div className='center flex flex-row'>
				<i className='nav-button fa fa-search center click'/>
				<input id='search' 
					className='flex'
					placeholder='search' 
					onKeyPress={_.debounce(this.handleKeypress, 300)} />
          </div>
		);
	}

});


module.exports = SearchBar;