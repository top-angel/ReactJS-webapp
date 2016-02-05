import R from 'ramda';
import api from './api';

// adds a set to a user's favorites
// TODO write as pure function
export function favoriteSet(setId, userId, push) {
	api.post('setmineuser/favorites', {
		user_id: userId,
		set_id: setId
	}).then(res => {
		// doesn't return from the server yet :(
		var favoriteSetIds = R.pluck('id', res.favorites.user.favorite_sets)

		// store favorites in appState
		push({
			type: 'SHALLOW_MERGE',
			data: {
				favoriteSetIds: favoriteSetIds
			}
		})
	})
}

// checks if a set is favorited
export function checkIfFavorited(setId, favoriteSetIds) {
	return R.contains(setId, favoriteSetIds)
}