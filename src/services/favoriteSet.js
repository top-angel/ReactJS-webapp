import R from 'ramda';
import api from './api';

// adds a set to a user's favorites
// TODO write as pure function
export function favoriteSet(setId, userId, push) {
	api.post('setmineuser/favorites', {
		user_id: userId,
		set_id: setId
	}).then(res => {
		// console.log(res);
		// doesn't return from the server yet :(
		let favoriteSetIds = R.pluck('id', res.favorites.user.favorite_sets)

		// store favorites in appState
		let msg = res.favorites.favorited_set.unfavorited ? 'Set removed from your favorites' : 'Set added to your favorites';
		push({
			favoriteSetIds: favoriteSetIds,
			snackbar: {
				open: true,
				message: msg
			}
		});
	})
}

// checks if a set is favorited
export function checkIfFavorited(setId, favoriteSetIds) {
	return R.contains(setId, favoriteSetIds)
}