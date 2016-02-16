import React from 'react';
import LandingHome from './LandingHome';
import LandingApp from './LandingApp';
import LandingBeacon from './LandingBeacon';
import Footer from './Footer';

const LandingPage = (props) => {
	return (
		<div id='LandingPage'>
			<LandingHome />
			<LandingApp />
			<LandingBeacon />
			<Footer />
		</div>
	);
}

export default LandingPage;