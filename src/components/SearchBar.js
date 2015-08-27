import React from 'react';
import Q from 'q';
// import $ from 'jquery';
import constants from '../constants/constants';
// import searchService from '../services/searchService';

var SearchBar = React.createClass({

	componentDidMount: function() {
		var _this = this;
		$('#search').keyup(function() {
			var query = $(this).val();

			//TODO throttle results
			if(query.length > 3) {
				_this.search(query);
			}
		});
	},
	search: function search(query) {
		var push = this.props.push;
		var results,
			searchUrl = constants.API_ROOT + 'search/' + query;

		$.ajax({
			url: searchUrl,
			type: 'get'
		})
		.done(function(response) {
			results = response.payload.search;
			console.log(results.events);
			push({
				type: 'SHALLOW_MERGE',
				data: {
					searchText: query,
					searchResults: {
						sets: results.sets,
						upcomingEvents: results.upcomingEvents,
						tracks: results.tracks
					}
				}
			});
		});
	},
	render: function() {
		return (
			<div className='center flex flex-row'>
				<i className="nav-button fa fa-search center click"/>
				<input id="search" 
					className="flex"
					placeholder='search'/>
          </div>
		);
	}

});

module.exports = SearchBar;