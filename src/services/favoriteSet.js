import React from 'react';
import R from 'ramda';
import {API_ROOT} from '../constants/constants';

export function favoriteSet(setId, userId, push) {
	$.ajax({
		type: 'POST',
		url: `${API_ROOT}setmineuser/favorites`,
		data: {
			'userData': {
				'userID': userId,
				'setId': setId
			}
		}
	}).done(() => {
		// fetch favorites & favorite set ids and push to appState
		getFavoriteSets(userId, push)

		// old API 
		// push({
		// 	type: 'SHALLOW_MERGE',
		// 	data: {
		// 		user: res.payload.favorites.user
		// 	}
		// });
	});
}

export function getFavoriteSets(userId, push) {
	$.ajax({
		type: 'get',
		url: `${API_ROOT}setmineuser/${userId}/stream`,
		data: {
			filter: 'favorites'
		}
	}).done(res => {
		if(res.status === 'success') {
			// store user's favorite set ids in appState
			var favorites = res.payload.setmineuser_stream;
			var favoriteSetIds = R.pluck('id', favorites);

			console.log('Favorites fetched')
			push({
				type: 'SHALLOW_MERGE',
				data: {
					favorites: favorites,
					favoriteSetIds: favoriteSetIds
				}
			})
		}
	})
}

function getFavorites(query) {
	return $.ajax({
		type: 'get',
		url: `${API_ROOT}graphql`,
		data: {
			query: query
		}
	})
}

export function checkFavorite(setId, favorites) {
	var setString = R.toString(setId);
	return R.contains(setString, favorites);
}