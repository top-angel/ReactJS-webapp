import React from 'react';
import R from 'ramda';
import Q from 'q';
import $ from 'jquery';

import constants from '../constants/constants';

//make api call
function fetchSearchResults(query) {
	var searchUrl = constants.API_ROOT + 'search/' + query;

	return $.ajax({
		url: 'searchUrl',
		type: 'get'
	});	
}

//do something with the response
function filterResults(response, push) {
	var payload = response.payload;
	return var results = {
		sets: payload.sets,
		events: payload.upcomingEvents,
		tracks: payload.tracks,
		artists: payload.artists
	};
	push({
		type: 'SHALLOW_MERGE',
		data: {searchResults: results}
	});
}

function errorPromise(jqXHR, textStatus) {
	console.log('ERROR', jqXHR, textStatus, errorThrown);
	return Q.reject(errorThrown);
}

function search(query, appState, push) {
	var searchResults = appState.get('searchResults');
	fetchSearchResults(query).then(filterResults, errorPromise);
}

module.exports = {
	search: search
};