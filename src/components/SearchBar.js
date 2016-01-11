import React from 'react';
import {Link} from 'react-router';
import {API_ROOT} from '../constants/constants';
import history from '../services/history';
import _ from 'underscore';

var SearchBar = React.createClass({

	contextTypes: {
		push: React.PropTypes.func
	},

	handleKeypress(e) {
		var query = document.getElementById('search').value;
		if(query.length >= 3 || e.charCode == 13) {
			this.search(query);
		} 
	},

	search(query) {
		var activeSearchAjax = null;
		var results, 
			searchUrl = `${API_ROOT}search/${query}`;

		$.ajax({
			url: searchUrl,
			type: 'get'
		}).done(res => {
			if(res.status === 'success') {
				results = res.payload.search;
				var {artists, sets, events, tracks} = results;

				console.log(results);

				this.context.push({
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


export default SearchBar;