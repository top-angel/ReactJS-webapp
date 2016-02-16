import React from 'react';
import Link from 'react-router/lib/Link';
import Icon from './FaIcon';

function openIos() {
	window.open('http://bit.ly/SetmineiOS');
	mixpanel.track("iOS App Link Clicked");
}

function openAndroid() {
	window.open('http://bit.ly/SetmineAndroid');
	mixpanel.track("Android App Link Clicked");
}

const LandingHome = () => {
	let scroll = () => {
		//TODO Fix this
		setTimeout(() => {
			$(window).scrollTo($('#LandingHome').height(), 400, {
				offset: -'8vh'
			})
		}, 200)
	}
	return (
		<div id='LandingHome' className='flex-column'>
			<h1>Setmine</h1>
			<h2>Relive your favorite sets</h2>
			<div className='flex-row'>
				<Icon onClick={openIos}>apple</Icon>
				<Icon onClick={openAndroid}>android</Icon>
			</div>
			<Link to='/sets'>
				<p>Listen Now</p>
			</Link>
			<Icon onClick={scroll}>chevron-down</Icon>
		</div>
	);
}

export default LandingHome;