import React from 'react';
import {Link} from 'react-router';

var Footer = React.createClass({

	scrollToTop: function() {
		$(window).scrollTo(0,200);
	},
	trackiOS: function() {
		mixpanel.track("iOS App Link Clicked");
	},
	trackAndroid: function() {
		mixpanel.track("Android App Link Clicked");
	},

	render: function() {
		return (
			<footer className='flex-row'>
				<div className='buffer'/>
				<div className='flex-column'>
					<a className='click hidden' id='contact'>
						Contact Us
					</a>
					<a className='click' href='http://setmine.com/about'>
						About
					</a>
					<Link to='/legal'>
						<a className='click' id='dmca'>
							DMCA Notice
						</a>
					</Link>
					<a href='http://bit.ly/SetmineiOS' onClick={trackiOS} title='view on App Store' className='click'>
						iOS
					</a>
					<a href='http://bit.ly/SetmineAndroid' onClick={trackAndroid} title='view on Google Play'className='click'>
						Android
					</a>
	          </div>
	          <div className='buffer-lg'/>
	          <div className='flex-column flex'>
		          <div className='flex-row center'>
					<a href='https://www.facebook.com/SetmineApp'><i className='fa fa-2x fa-facebook fa-fw'/></a>
					<a href='https://twitter.com/setmineapp'><i className='fa fa-2x fa-twitter fa-fw'/></a>
					<a href='https://instagram.com/setmine/'><i className='fa fa-2x fa-instagram fa-fw'/></a>
	             	</div>
	             	<div className='divider'/>
	             	<div className='center'>
		             	<i className='fa fa-copyright'/> 
		             	{' Setmusic LLC. 2015'}
	             	</div>
				</div>
				<div className='buffer-lg'/>
				<div className='flex-column flex-zero'>
					<a className='center' href='https://teamtreehouse.com'><img src='/images/treehouse.png' /></a>
					<a className='center' href='https://mixpanel.com/f/partner'><img src='//cdn.mxpnl.com/site_media/images/partner/badge_light.png' alt='Mobile Analytics' /></a>
				</div>
				<div className='buffer'/>
	        </footer>
		);
	}
});

module.exports = Footer