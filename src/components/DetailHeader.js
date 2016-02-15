import React, {PropTypes} from 'react';
import {S3_ROOT_FOR_IMAGES} from '../constants/constants';
import {playSet, updatePlayCount} from '../services/playerService';
import Base from './Base';

const DetailHeader = ({image, children}) => {
	image = {
		backgroundImage: `url('${S3_ROOT_FOR_IMAGES+image}')`
	};
	return (
		<div id='DetailHeader' className='flex-column' style={image}>
			{children}
		</div>
	);
}

DetailHeader.propTypes = {
	image: PropTypes.string.isRequired
};

export default DetailHeader;
