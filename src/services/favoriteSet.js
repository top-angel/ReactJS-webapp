import React from 'react';
import R from 'ramda';
import constants from '../constants/constants';
import mixpanelService from '../services/mixpanelService.js';

function favoriteSet(push, user, id) {
	var favoriteUrl = constants.API_ROOT + 'user/updateFavoriteSets';
	$.ajax({
		type: 'POST',
		url: favoriteUrl,
		data: {
			'userData': {
				'userID': user.id,
				'setId': id
			}
		}
	})
	.done(function(res) {
		push({
			type: 'SHALLOW_MERGE',
			data: {
				user: res.payload.user
			}
		});
	});
}

function checkFavorite(set, favorites) {
	var setString = R.toString(set);
	return R.contains(setString, favorites);
}

module.exports = {
	checkFavorite: checkFavorite,
	favoriteSet: favoriteSet
};