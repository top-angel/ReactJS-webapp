import React, {PropTypes} from 'react';
import { S3_ROOT_FOR_IMAGES, DEFAULT_IMAGE } from '../constants/constants';

const FestivalTile = ({festival, id, setCount, bannerImage, formattedDate}, {router}) => {
	let sets = setCount != 1 ? `${setCount} sets`: `${setCount} set`;
	let image = DEFAULT_IMAGE || bannerImage.imageURL;
	return (
		<div className='col-xs-6 col-sm-4 col-xl-3'>
			<div className='festival-tile flex-column' 
				style={{ backgroundImage: `url('${S3_ROOT_FOR_IMAGES + bannerImage}')` }}
				onClick={() => router.push(`/festival/${id}`)}>
				<header className='flex-column'>
					<p className='info'>{`${sets} | ${formattedDate}`}</p>
					<p className='festival'>{festival}</p>
				</header>
			</div>
		</div>
	);
}

const {string, number, object} = PropTypes;

FestivalTile.contextTypes = {
	router: string
};

FestivalTile.propTypes = {
	event: string,
	bannerImage: string,
	setCount: number,
	formattedDate: string,
	id: number
};

export default FestivalTile;