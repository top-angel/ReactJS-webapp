import React, {PropTypes} from 'react';
import Base from './Base';
import Link from 'react-router/lib/Link';
import {Shape, Surface, Path} from 'react-art';
import Footer from './Footer';
import ActionButton from './ActionButton';

// images
import screens from '../../public/images/screens.png';
import curvedRectangle from '../../public/images/curvedRectangle.svg';

const {object, func} = PropTypes;
const shapeDims = {
	fill: '#f8f8f8',
	d: 'M0,440 C0,440 200,499.09189 600,510.909091 C1000,499.09189 1200,440.00127 1200,440.00127 L1200,700 L0,700 L0,440 Z'
};


export default class LandingPage extends Base {
	componentWillMount() {
		this.context.push({
			showNavbar: false,
			currentPage: 'Setmine'
		});
	}
	componentWillUnmount() {
		this.context.push({ showNavbar: true });
	}
	render() {
		return (
			<div id='LandingPage' className='flex-column'>
				<section className='main'>
					<div className='flex-column'>
                        <ActionButton to='/home'>Listen Now</ActionButton>
                        <h4>Discover music festivals and live events around the globe.</h4>
					</div>
				</section>
                <section className='beacons'>

                </section>
			</div>
		);
	}
}

LandingPage.contextTypes = {
	router: object.isRequired,
	push: func
};

// With Setmine, you can:
// - Unlock FREE exclusive content from our artists by walking into select stores, bars, and venues
// - Listen to performances played at previous events and festivals
// - See lineups and find tickets for upcoming events in your area
// - View the individual songs in a set with our tracklist feature
					// <img src={curvedRectangle} className='shape'/>
