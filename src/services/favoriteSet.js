import R from 'ramda';
import api from './api';

// adds a set to a user's favorites
export function favoriteSet(setId, userId, push) {
	api.post('setmineuser/favorites', {
		user_id: userId,
		set_id: setId
	}).then(res => {
		console.log('set favorited', res)
		getFavoriteSets(userId, push)
	})
}

// fetches a user's favorite sets
export function getFavoriteSets(userId, push) {
	api.get(`setmineuser/${userId}/stream?filter=favorites`).then(res => {
		var favorites = res.setmineuser_stream;
		var favoriteSetIds = R.pluck('id', favorites);
		console.log('Favorites fetched')
		
		// store favorites in appState
		push({
			type: 'SHALLOW_MERGE',
			data: {
				favorites: favorites,
				favoriteSetIds: favoriteSetIds
			}
		})
	})
}

// checks if a set is favorited
export function checkIfFavorited(setId, favorites) {
	return R.contains(setId, favorites);
}