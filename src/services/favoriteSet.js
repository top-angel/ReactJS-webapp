import R from 'ramda';
import api from './api';

// adds a set to a user's favorites
export function favoriteSet(setId, userId, push) {
	api.post('setmineuser/favorites', {
		user_id: userId,
		set_id: setId
	}).then(res => {
		// doesn't return from the server yet :(
		var favoriteSetIds = R.pluck('id', res.favorites.user.favorite_sets)
		console.log(favoriteSetIds)

		// store favorites in appState
		push({
			type: 'SHALLOW_MERGE',
			data: {
				favoriteSetIds: favoriteSetIds
			}
		})
	})
}