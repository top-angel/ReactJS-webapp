import React from 'react'
import {Link} from 'react-router'
import api from '../services/api'
import history from '../services/history'
import _ from 'underscore'

const SearchBar = (props, context) => {
	function handleKeypress(e) {
		var query = document.getElementById('search').value
		if(query.length >= 3 || e.charCode == 13) {
			search(query)
		} 
	}

	function search(query) {
		api.get(`search/${query}`).then(res => {
			var {artists, sets, events, tracks} = res.search
			context.push({
				type: 'SHALLOW_MERGE',
				data: {
					searchResults: {
						sets: sets,
						upcomingEvents: events,
						tracks: tracks,
						artists: artists
					}
				}
			})

			history.pushState(null, '/search')
		})
	}

	return (
		<div className='center flex flex-row'>
			<Link className='nav-button fa fa-search center click' to='/search' />
			<input id='search' 
				className='flex'
				placeholder='search' 
				onKeyPress={_.debounce(handleKeypress, 300)} />
        </div>
	)
}

SearchBar.contextTypes = {
	push: React.PropTypes.func
}

export default SearchBar