import React, {PropTypes} from 'react';
import { S3_ROOT_FOR_IMAGES, DEFAULT_IMAGE } from '../constants/constants';
import history from '../services/history';

const FestivalTile = ({festival, id, setCount, bannerImage, formattedDate}) => {
	let sets = setCount != 1 ? `${setCount} sets`: `${setCount} set`;
	let image = DEFAULT_IMAGE || bannerImage.imageURL;
	return (
		<div className='festival-tile flex-column' 
			style={{ backgroundImage: `url('${S3_ROOT_FOR_IMAGES + bannerImage}')` }}
			onClick={() => history.pushState(null, `/festival/${id}`)}>
			<header className='flex-column'>
				<p className='info'>{`${sets} | ${formattedDate}`}</p>
				<p className='festival'>{festival}</p>
			</header>
		</div>
	);
}

FestivalTile.propTypes = {
	event: PropTypes.string,
	bannerImage: PropTypes.string,
	setCount: PropTypes.number,
	formattedDate: PropTypes.string,
	id: PropTypes.number
};

export default FestivalTile;