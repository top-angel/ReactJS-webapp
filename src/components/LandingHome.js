import React from 'react';
import {Link} from 'react-router';

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
		<div className='flex-column' id='LandingHome'>
			<h1 className='center wow zoomIn'>Setmine</h1>
			<h2 className='center wow zoomIn'>Relive your favorite sets</h2>
			<div className='center'>
			    <a href='http://bit.ly/SetmineiOS' onClick={() => mixpanel.track("iOS App Link Clicked")} className='fa fa-apple fa-fw fa-4x wow fadeInLeft click'/>
			    <a href='http://bit.ly/SetmineAndroid' onClick={() => mixpanel.track("Android App Link Clicked")} className='fa fa-android fa-fw fa-4x wow fadeInRight click'/>
			</div>
			<Link to='/sets' className='header-small center click wow fadeInUp' id='listen-now'>Listen Now</Link>
			<i className='fa fa-chevron-down center click wow slideInUp' onClick={scroll} />
        </div>
	)
}

export default LandingHome;