import React from 'react';
import splice from '../services/splice';
import {History} from 'react-router';
import constants from '../constants/constants';

var SearchBar = React.createClass({

	mixins: [History],
	componentDidMount() {
		var self = this;
		$(document.body).on('keypress', function(e) {
			$('#search').focus();
		})
	},

	handleKeypress(e) {
		var query = document.getElementById('search').value;
		if(e.charCode != 32 && query.length % 3 === 0) {
			this.search(query);
		}
	},

	search(query) {
		var self = this;
		var push = this.props.push;
		var activeSearchAjax = null;
		var results, 
			searchUrl = constants.API_ROOT + 'search/' + query;

		push({
			type: 'SHALLOW_MERGE',
			data: {
				loaded: false
			}
		});

		if(activeSearchAjax != null) {
			activeSearchAjax.abort();
			activeSearchAjax = null;
		}

		activeSearchAjax = $.ajax({
			url: searchUrl,
			type: 'get'
		})
		.done(function(response) {
			results = response.payload.search;
			// var sets = splice.bigArray(results.sets, 50);
			// var events = splice.bigArray(results.upcomingEvents, 50);
			// var tracks = splice.bigArray(results.tracks, 50);
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