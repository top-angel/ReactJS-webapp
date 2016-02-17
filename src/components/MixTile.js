import React from 'react';
import {S3_ROOT_FOR_IMAGES} from '../constants/constants';
import history from '../services/history';

const MixTile = ({iconImage, event, id, setCount}) => {
	const openMixPage = () => {
		history.pushState(null, `/mix/${id}`);
	}
	const sets = setCount != 1 ? 'sets' : 'set';
	return (
		<div className='mix-tile flex-column' onClick={openMixPage} title={event}>
			<img src={S3_ROOT_FOR_IMAGES + iconImage}/>
			<p>{event}</p>
			<p>{`${setCount} ${sets}`}</p>
		</div>
	);
}

export default MixTile;