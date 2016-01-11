import React from 'react';
import R from 'ramda';
import {API_ROOT} from '../constants/constants';

export function favoriteSet(push, user, setId) {
	$.ajax({
		type: 'POST',
		url: `${API_ROOT}setmineuser/favorites`,
		data: {
			'userData': {
				'userID': user.id,
				'setId': setId
			}
		}
	}).done((res) => {
		// TODO you might need to change this
		push({
			type: 'SHALLOW_MERGE',
			data: {
				user: res.payload.user
			}
		});
	});
}

export function checkFavorite(set, favorites) {
	var setString = R.toString(set);
	return R.contains(setString, favorites);
}