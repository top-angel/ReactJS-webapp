import React from 'react';
import {History} from 'react-router';
import constants from '../constants/constants';

var SearchBar = React.createClass({

	mixins: [History],

	// handleKeypress(e) {
	// 	var query = document.getElementById('search').value;
	// 	if(query.length % 2 == 0 && e.charCode != 32) {
	// 		this.search(query);
	// 	} else if(e.charCode == 13) {
	// 		this.props.push({
	// 			type: 'SHALLOW_MERGE',
	// 			data: {
	// 				loaded: false
	// 			}
	// 		});
	// 		this.search(query);
	// 	}
	// },
	handleKeypress(e) {
		var query = document.getElementById('search').value;
		if(query.length >= 3) {
			setInterval(this.search(query), 2000);
		} else if(e.charCode == 13) {
			this.search(query);
		}
	},

	search(query) {
		var self = this;
		var push = this.props.push;
		var activeSearchAjax = null;
		var results, 
			searchUrl = constants.API_ROOT + 'search/' + query;

		// if(activeSearchAjax != null) {
		// 	activeSearchAjax.abort();
		// 	activeSearchAjax = null;
		// }

		// activeSearchAjax = 

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
					loaded: true,
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
					onKeyPress={this.handleKeypress} />
          </div>
		);
	}

});


module.exports = SearchBar;