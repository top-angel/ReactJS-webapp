import React from 'react';
import {S3_ROOT_FOR_IMAGES, DEFAULT_IMAGE} from '../constants/constants';
import history from '../services/history';

const ArtistTile = ({artist, imageURL, setCount, eventCount}) => {
	function openArtistPage() {
		let route = artist.split(' ').join('_');
		history.pushState(null, `/artist/${route}`);
		mixpanel.track("Artist Clicked", {
			"Artist": artist
		});
	}

	let image = { backgroundImage: `url('${S3_ROOT_FOR_IMAGES+imageURL}')` };
	let setText = setCount > 1 ? 'sets' : 'set';
	let eventText = eventCount != 1 ? 'events' : 'event';
	let artistInfo = `${setCount} ${setText} | ${eventCount} ${eventText}`;

	return (
		<div className='artist-tile flex-column' onClick={openArtistPage} title={artist}>
			<img src={S3_ROOT_FOR_IMAGES+imageURL} />
			<h5>{artist}</h5>
			<p>{artistInfo}</p>
		</div>
	);
}

ArtistTile.defaultProps = {
	imageURL: DEFAULT_IMAGE
};

export default ArtistTile;