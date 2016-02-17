import React, {PropTypes} from 'react';
import Link from 'react-router/lib/Link';
import Icon from './FaIcon';

const NoFavorites = () => {
	return (
		<div id='NoFavorites' className='flex-column'>
			<img src='/public/images/noFavorites.png' />
			<p>
				Click the <Icon>star-o</Icon> to save your favorite sets. 
				<br/>
				You'll find them here waiting for you
			</p>
			<Link to='/sets'>
				<button>BROWSE</button>
			</Link>
		</div>
	);
}

export default NoFavorites;