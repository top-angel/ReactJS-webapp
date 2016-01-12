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
		push({
			type: 'SHALLOW_MERGE',
			data: {
				user: res.payload.favorites.user
			}
		});
	});
}

export function checkFavorite(setId, favorites) {
	var setString = R.toString(setId);
	return R.contains(setString, favorites);
}