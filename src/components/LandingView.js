import React from 'react';
import constants from '../constants/constants';

import LandingHome from './LandingHome';
import LandingApp from './LandingApp';
import LandingBeacon from './LandingBeacon';
import Footer from './Footer';

const LandingView = React.createClass({

	displayName: 'Home Page',

	render() {
		var playerHidden = this.props.appState.get('playerHidden');
		if(playerHidden) {
			var hidePlayer = true;
		} else {
			var hidePlayer = false;
		}

		return (
			<div id='LandingView' className='flex-column view'>
				<LandingHome hidePlayer={hidePlayer} />
				<LandingApp hidePlayer={hidePlayer} />
				<LandingBeacon hidePlayer={hidePlayer} />
				<Footer />
			</div>
		);
	}

});

export default LandingView;