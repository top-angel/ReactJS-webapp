import React from 'react';
import {Link} from 'react-router';
import {API_ROOT} from '../constants/constants';
import history from '../services/history';
import _ from 'underscore';

var SearchBar = React.createClass({

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
		var push = this.props.push;
		var activeSearchAjax = null;
		var results, 
			searchUrl = `${API_ROOT}search/${query}`;

		$.ajax({
			url: searchUrl,
			type: 'get'
		})
		.done(res => {
			if(res.status === 'success') {
				results = res.payload.search;
				var artists = results.artists;
				var sets = results.sets;
				var events = results.events;
				var tracks = results.tracks;

				console.log(results);

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

				history.pushState(null, '/search');
			}
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