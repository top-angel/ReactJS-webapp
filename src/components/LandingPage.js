import React, {PropTypes} from 'react';
import Base from './Base';
import Link from 'react-router/lib/Link';
import {Shape, Surface, Path, Group} from 'react-art';
import Footer from './Footer';
import ActionButton from './ActionButton';
import Icon from './Icon';

import {Element, Events, animateScroll} from 'react-scroll';

const {object, func} = PropTypes;
const width = window.innerWidth;
const shapeDims = {
	fill: '#f8f8f8',
	d: `M0,440 C0,440 200,499.09189 600,510.909091 C1000,499.09189 ${width},440.00127 ${width},440.00127 L${width},700 L0,700 L0,440 Z`
};

import unlockImg from '../images/beacons.png';
import calendarImg from '../images/calendar.png';
import festivalImg from '../images/festivals.png';

export default class LandingPage extends Base {
	constructor(props) {
		super(props);
		this.autoBind('scrollToTop')
	}
	componentWillMount() {
		this.context.push({
			showNavbar: false,
			currentPage: 'Setmine'
		});
	}
	componentDidMount() {
		Events.scrollEvent.register('begin', () => {
			console.log('begin');
		});

		Events.scrollEvent.register('end', () => {
			console.log('end');
		});
	}
	componentWillUnmount() {
		this.context.push({ showNavbar: true });
		Event.scrollEvent.remove('begin');
		Event.scrollEvent.remove('end');
	}
	scrollToTop() {
		animateScroll.scrollToTop();
	}
	render() {
		return (
			<div id='LandingPage' className='flex-column'>
				<section className='main flex-column'>
					<h2>Relive your favorite sets</h2>
					<div className='flex-column'>
                        <ActionButton to='/home'>Listen Now</ActionButton>
                        <h4>Discover music festivals and live events around the globe.</h4>
                        <div className='arrow'>
	                        <Icon size={32}>ios-arrow-down</Icon>
                        </div>
					</div>
				</section>

                <section className='info flex-column'>
                	<li className='flex-row-nowrap'>
                		<img src={unlockImg} />
                		<div className='circle'/>
                		<p>Unlock FREE exclusive music from our artists by walking into select stores, bars, and venues</p>
                	</li>
                	<li className='flex-row-nowrap'>
                		<img src={festivalImg} />
                		<div className='circle'/>
                		<p>Listen to performances played at previous events and festivals</p>
                	</li>
                	<li className='flex-row-nowrap'>
                		<img src={calendarImg} />
                		<div className='circle'/>
                		<p>See lineups and find tickets for upcoming events in your area</p>
                	</li>
                	<div className='app-links flex-row'>
                		<Icon size={72}>social-apple</Icon>
                		<Icon size={72}>social-android</Icon>
                	</div>
                </section>
                <Footer/>
			</div>
		);
	}
}

LandingPage.contextTypes = {
	router: object.isRequired,
	push: func
};