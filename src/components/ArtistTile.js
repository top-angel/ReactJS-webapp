import React from 'react'
import {S3_ROOT_FOR_IMAGES, DEFAULT_IMAGE} from '../constants/constants'
import history from '../services/history'

const ArtistTile = (props) => {
	function openArtistPage() {
		var artist = props.artist.split(' ').join('_')
		history.pushState(null, `/artist/${artist}`)
		mixpanel.track("Artist Clicked", {
			"Artist": props.artist
		})
	}

	var image = { backgroundImage: `url('${S3_ROOT_FOR_IMAGES+props.imageURL}')` }
	var setText = props.set_count > 1 ? 'sets' : 'set'
	var eventText = props.event_count != 1 ? 'events' : 'event'
	var artistInfo = `${props.set_count} ${setText} | ${props.event_count} ${eventText}`

	return (
		<div styleName='artist-tile' className='flex-column' onClick={openArtistPage}>
			<img src={S3_ROOT_FOR_IMAGES+props.imageURL} />
			<div styleName='artist'>{props.artist}</div>
			<p>{artistInfo}</p>
		</div>
	)
}

export default ArtistTile