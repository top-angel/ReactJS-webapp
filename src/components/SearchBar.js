import React from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'
import _ from 'underscore'
import api from '../services/api'
import history from '../services/history'
import Base from './Base'

export default class SearchBar extends Base {
	constructor(props) {
		super(props)
		this.autoBind('search', 'handleKeypress')
	}
	handleKeypress(e) {
		let query = ReactDOM.findDOMNode(this.refs.search).value
		if(query.length >= 3 || e.charCode == 13) {
			this.search(query)
		}
	}
	search(query) {
		api.get(`search/${query}`).then(res => {
			var {artists, sets, events, tracks} = res.search
			this.context.push({
				searchResults: {
					sets: sets,
					upcomingEvents: events,
					tracks: tracks,
					artists: artists
				}
			})

			history.pushState(null, '/search')
		})
	}
	render() {
		return (
			<div id='SearchBar' className='flex-row'>
				<i className='fa fa-search'/>
				<input
					id='search'
					placeholder='search'
					ref='search'
					onKeyPress={_.debounce(this.handleKeypress, 300)} />
			</div>
		)
	}
}

SearchBar.contextTypes = {
	push: React.PropTypes.func
}