import React, {PropTypes} from 'react';
import {S3_ROOT_FOR_IMAGES} from '../constants/constants';

const MixTile = ({iconImage, event, id, setCount}, {router}) => {
	const openMixPage = () => {
		router.push(`/mix/${id}`);
	}
	const sets = setCount != 1 ? 'sets' : 'set';

	return (
		<div className='col-xs-6 col-sm-4 col-md-3 col-lg-2'>
			<div className='mix-tile flex-column' onClick={openMixPage} title={event}>
				<img src={S3_ROOT_FOR_IMAGES + iconImage}/>
				<p>{event}</p>
				<p>{`${setCount} ${sets}`}</p>
			</div>
		</div>
	);
}

const {string, number, object} = PropTypes;

MixTile.contextTypes = {
	router: object
};

MixTile.propTypes = {
	iconImage: string,
	event: string,
	id: number,
	setCount: number
}

export default MixTile;