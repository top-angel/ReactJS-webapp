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
			<footer>
				<div className='buffer'/>
				<div className='flex-column'>
					<a className='click hidden' id='contact'>
						Contact Us
					</a>
					<Link to='/about'>
						<a className='click' href='https://www.setmine.com/about'>
							About
						</a>
					</Link>
					<Link to='/legal'>
						<a className='click' id='dmca'>
							DMCA Notice
						</a>
					</Link>
					<a href='http://bit.ly/SetmineiOS' onClick={this.trackiOS} title='view on App Store' className='click'>
						iOS
					</a>
					<a href='http://bit.ly/SetmineAndroid' onClick={this.trackAndroid} title='view on Google Play'className='click'>
						Android
					</a>
					<div className='copyright'>
		             	<i className='fa fa-copyright'/> 
		             	{' Setmusic LLC. 2015'}
	             	</div>
	          </div>
	          <div className='buffer-lg'/>
				<div className='flex-column flex'>
					<h4 className='flex-row'>
						<i className='fa fa-share-alt'/>
						<span>CONNECT WITH US</span>
					</h4>
					<ul>
						<li>
							<a className='fa fa-fw fa-envelope-o'></a>
							<span>jesus@setmine.com</span>
						</li>
						<li>
							<a href='https://www.facebook.com/SetmineApp' className='fa fa-fw fa-facebook-square'></a>
							<span>Facebook</span>
						</li>
						<li>
							<a href='https://twitter.com/setmineapp' className='fa fa-fw fa-twitter-square'></a>
							<span>Twitter</span>
						</li>
						<li>
							<a href='https://instagram.com/setmine/' className='fa fa-fw fa-instagram'></a>
							<span>Instagram</span>
						</li>
						<li>
							<a href='http://setmine.tumblr.com/' className='fa fa-fw fa-tumblr-square'></a>
							<span>Tumblr</span>
						</li>
					</ul>
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