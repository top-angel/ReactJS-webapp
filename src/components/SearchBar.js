import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import _ from 'underscore';
import api from '../services/api';
import Base from './Base';

export default class SearchBar extends Base {
	constructor(props) {
		super(props);
		this.autoBind('search', 'handleKeypress', 'handleKeydown');
	}
	componentDidMount() {
		document.addEventListener('keydown', this.handleKeydown);
	}
	handleKeydown(e) {
		let key = e.keyCode || e.which;
		let search = ReactDOM.findDOMNode(this.refs.search);
		let inactiveInput = document.activeElement.tagName.toLowerCase() === 'body';
		let isSearchingEvents = !((search != document.activeElement) && inactiveInput);

		if(isSearchingEvents) {
			return;
		}

		switch(true) {
			case(key >= 97 && key <= 122):
				search.focus();
				break;
			case(key >= 65 && key <= 90):
				search.focus();
				break;
		}
	}
	handleKeypress(e) {
		let query = ReactDOM.findDOMNode(this.refs.search).value;
		if(query.length >= 3 || e.charCode == 13) {
			this.search(query);
		}
	}
	search(query) {
		api.get(`search/${query}`).then(res => {
			var {artists, sets, events, tracks} = res.search;
			this.context.push({
				searchResults: {
					sets: sets,
					upcomingEvents: events,
					tracks: tracks,
					artists: artists
				}
			});

			this.context.router.push('/search');
		})
	}
	render() {
		return (
			<div id='SearchBar'>
				<i className='fa fa-search'/>
				<input
					id='search'
					placeholder='search'
					ref='search'
					onKeyPress={_.debounce(this.handleKeypress, 300)} />
			</div>
		);
	}
}

SearchBar.contextTypes = {
	push: React.PropTypes.func,
	router: React.PropTypes.object
};