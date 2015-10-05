import React from 'react';
import R from 'ramda';
import constants from '../constants/constants';
import {History} from 'react-router';

import LandingHome from './LandingHome';
import LandingApp from './LandingApp';
import LandingBeacon from './LandingBeacon';
import Footer from './Footer';

var LandingView = React.createClass({

	displayName: 'Home Page',
	mixins: [History],

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

module.exports = LandingView;
