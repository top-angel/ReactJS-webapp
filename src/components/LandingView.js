import React from 'react';
import constants from '../constants/constants';

import LandingHome from './LandingHome';
import LandingApp from './LandingApp';
import LandingBeacon from './LandingBeacon';
import Footer from './Footer';

const LandingView = (props) => {
	return (
		<div id='LandingView' className='flex-column view'>
			<LandingHome />
			<LandingApp />
			<LandingBeacon />
			<Footer />
		</div>
	)
}

export default LandingView;