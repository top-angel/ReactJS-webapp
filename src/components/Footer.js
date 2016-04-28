import React, {PropTypes} from 'react';
import Link from 'react-router/lib/Link';
import Icon from './FaIcon';

const trackAndroid = () => mixpanel.track("Android App Link Clicked");
const trackIos = () => mixpanel.track("iOS App Link Clicked");
const iconMargin = {
	marginRight: '2rem'
};

const Footer = props => (
	<footer id='Footer'>
		<div className='links flex-column'>
			<div className='flex-row'>
				<Icon style={iconMargin}>copyright</Icon>
				<p>Setmusic LLC. 2015</p>
			</div>
      </div>

		<div className='social'>
			<div className='flex-row'>
				<Icon style={iconMargin}>share-alt</Icon>
				<h5>Connect With Us</h5>
			</div>
			<ul>
				<li>
					<a className='flex-row' href='mailto:contact@setmine.com'>
						<Icon style={iconMargin}>envelope-o</Icon>
						<p>jesus@setmine.com</p>
					</a>
				</li>
				<li>
					<a className='flex-row' href='https://www.facebook.com/SetmineApp'>
						<Icon style={iconMargin}>facebook-square</Icon>
						<p>facebook</p>
					</a>
				</li>
				<li>
					<a className='flex-row' href='https://twitter.com/setmineapp'>
						<Icon style={iconMargin}>twitter-square</Icon>
						<p>twitter</p>
					</a>
				</li>
				<li>
					<a className='flex-row' href='https://instagram.com/setmine/'>
						<Icon style={iconMargin}>instagram</Icon>
						<p>instagram</p>
					</a>
				</li>
				<li>
					<a className='flex-row' href='http://setmine.tumblr.com/'>
						<Icon style={iconMargin}>tumblr-square</Icon>
						<p>tumblr</p>
					</a>
				</li>
			</ul>
		</div>
		<div className='sponsors flex-column'>
			<a href='https://teamtreehouse.com'><img src='/images/treehouse.png' /></a>
			<a href='https://mixpanel.com/f/partner'><img src='//cdn.mxpnl.com/site_media/images/partner/badge_light.png' alt='Mobile Analytics' /></a>
		</div>
	</footer>
);

export default Footer;