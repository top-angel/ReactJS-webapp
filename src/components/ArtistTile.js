import React, {PropTypes} from 'react';
import {S3_ROOT_FOR_IMAGES, DEFAULT_IMAGE} from '../constants/constants';

const ArtistTile = ({artist, imageURL, setCount, eventCount}, {router}) => {
	function openArtistPage() {
		let route = artist.split(' ').join('_');
		router.push(`/artist/${route}`);
		mixpanel.track("Artist Clicked", {
			"Artist": artist
		});
	}

	let image = { backgroundImage: `url('${S3_ROOT_FOR_IMAGES+imageURL}')` };
	let setText = setCount > 1 ? 'sets' : 'set';
	let eventText = eventCount != 1 ? 'events' : 'event';
	let artistInfo = `${setCount} ${setText} | ${eventCount} ${eventText}`;

	return (
		<div className='col-xs-6 col-sm-4 col-md-3 col-lg-2'>
			<div className='artist-tile flex-column' onClick={openArtistPage} title={artist}>
				<img src={S3_ROOT_FOR_IMAGES+imageURL} />
				<h5>{artist}</h5>
				<p>{artistInfo}</p>
			</div>
		</div>
	);
}

const {object, string, number} = PropTypes;

ArtistTile.contextTypes = {
	router: object
};

ArtistTile.propTypes = {
	artist: string,
	imageURL: string,
	setCount: number,
	eventCount: number
};

ArtistTile.defaultProps = {
	imageURL: DEFAULT_IMAGE
};

export default ArtistTile;