import {S3_ROOT_FOR_IMAGES} from '../constants/constants'

export function shareToFacebook(setId, artistImage) {
	FB.ui({
		method: 'feed',
		link: 'https://setmine.com/play/' + setId,
		caption: 'Share this Set',
		picture: S3_ROOT_FOR_IMAGES + artistImage
	}, function(response) {
		console.debug(response)
	})
}

export function shareToTwitter(setId) {
	let parameters = 'url=' + encodeURIComponent('https://setmine.com/play/' + setId + '&via=SetMineApp')
	window.open('https://twitter.com/intent/tweet?' + parameters, '_blank', 'height=420, width=550')
}