import React from 'react';
import {History, Link} from 'react-router';
import {API_ROOT} from '../constants/constants';
import _ from 'underscore';

var SearchBar = React.createClass({

	mixins: [History],

	componentWillUnmount() {
		this.props.push({
			type: 'SHALLOW_MERGE',
			data: {
				searchResults: {
					sets: [],
					upcomingEvents: [],
					tracks: [],
					artists: []
				}
			}
		});
	},

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
			searchUrl = `${API_ROOT}search/${query}`;

		$.ajax({
			url: searchUrl,
			type: 'get'
		})
		.done(res => {
			results = res.payload.search;
			var artists = results.artists;
			var sets = results.sets;
			var events = results.events;
			var tracks = results.tracks;

			push({
				type: 'SHALLOW_MERGE',
				data: {
					searchResults: {
						sets: sets,
						upcomingEvents: events,
						tracks: tracks,
						artists: artists
					}
				}
			});

			self.history.pushState(null, '/search');
		});
	},
	
	render() {
		return (
			<div className='center flex flex-row'>
				<Link className='nav-button fa fa-search center click' to='/search' />
				<input id='search' 
					className='flex'
					placeholder='search' 
					onKeyPress={_.debounce(this.handleKeypress, 300)} />
          </div>
		);
	}

});


module.exports = SearchBar;