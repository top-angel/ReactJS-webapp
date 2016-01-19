import React from 'react';
import Footer from './Footer';

var beaconLink = 'http://www.ibeacon.com/what-is-ibeacon-a-guide-to-beacons/';
var setmineIos = 'http://bit.ly/SetmineiOS';
var setmineAndroid = 'http://bit.ly/SetmineAndroid';
var setstoryIos = 'https://itunes.apple.com/us/app/setstory/id1044445159?mt=8';
var setstoryAndroid = 'https://play.google.com/store/apps/details?id=com.setmine.setstory';

var style = {
	base: {
		fontFamily: 'Avenir Light',
		fontSize: '1.875rem',
		letterSpacing: '0.075rem',
		marginTop: '8vh',
		textAlign: 'center'
	}
}

const About = React.createClass({

	componentDidMount() {
		$(window).scrollTo(0, 0);
	},

	render() {
		return (
			<div>
				<div id='About' className='flex-column'>
					<div className='flex-row contact center'>
						<p>Call us and personally talk to one of the founders</p>
						<i className='fa fa-phone'/>
						<p style={{fontFamily: 'Avenir Bold'}}>(954) 655-3231</p>
					</div>
					<section className='main flex-container'>
						<h2 className='center'>We use music to bring people to retailers</h2>
					</section>
					<section className='mission flex-column'>
						<h1>Our mission</h1>
						<h3>A new way to pay for music</h3>
						<p>We believe that artists can release free content to fans while receiving higher royalties than the industry standard.</p>
						<p>Artists have access to multiple streaming platforms, yet monthly fees and digital purchases keep fans away.</p>
						<p>Our beacon network delivers people to locations by allowing artists to "lock" new music at bars, venues, & retailers that only pay when a user walks in and unlocks content.</p>
						<a target='_blank' href={beaconLink}>Learn more about beacons</a>
					</section>
					<section className='image'/>
					<section className='products flex-column'>
						<h1>Products</h1>
						<div style={{marginBottom: '4rem'}}>
							<div className='flex-column product'>
								<img src='/images/setmusic/setmine-logo.png'/>
								<h2 style={{margin: '1rem'}}>Setmine</h2>
								<p>The music lover's app for hearing sets, discovering events, & unlocking music</p>
								<div className='flex-row' style={{margin:'1rem auto'}}>
									<a target='_blank' href={setmineIos}><i className='fa fa-fw fa-apple center'/></a>
									<a target='_blank' href={setmineAndroid}><i className='fa fa-fw fa-android center'/></a>
								</div>
							</div>
							<div className='flex-column product'>
								<img src='/images/setmusic/setstory-logo.png'/>
								<h2 style={{margin: '1rem'}}>Setstory</h2>
								<p>The retailer's tool for accepting artist offers & increasing foot-traffic</p>
								<div className='flex-row' style={{margin:'1rem auto'}}>
									<a target='_blank' href={setstoryIos}><i className='fa fa-fw fa-apple center'/></a>
									<a target='_blank' href={setstoryAndroid}><i className='fa fa-fw fa-android center'/></a>
								</div>
							</div>
						</div>
					</section>
					<section className='flex-container goal'>
						<h2 className='center'>We will provide the largest beacon network for any music platform to distribute content.</h2>
					</section>
					<section className='team flex-column'>
						<h1>Team</h1>
						<div className='flex-row' style={{padding: '0 10vw'}}>
							<div className='flex-column member'>
								<img src='/images/setmusic/profileJesus.jpg'/>
								<p>
									<h3>Jesus Najera</h3>
									<span>Founder & CEO</span>
								</p>
							</div>
							<div className='flex-column member'>
								<img src='/images/setmusic/profileOscar.jpg'/>
								<p>
									<h3>Oscar Lafarga</h3>
									<span>Founder & CTO</span>
								</p>
							</div>
							<div className='flex-column member'>
								<img src='/images/setmusic/profileConner.jpg'/>
								<p>
									<h3>Conner Fromknecht</h3>
									<span>Security & iOS</span>
								</p>
							</div>
							<div className='flex-column member'>
								<img src='/images/setmusic/profileEvan.jpg'/>
								<p>
									<h3>Evan Martinez</h3>
									<span>VP Product</span>
								</p>
							</div>
							<div className='flex-column member'>
								<img src='/images/setmusic/profileQuinn.png'/>
								<p>
									<h3>Quinn Pruitt</h3>
									<span>Chief Design Officer</span>
								</p>
							</div>
							<div className='flex-column member'>
								<img src='/images/setmusic/profileChristian.png'/>
								<p>
									<h3>Christian Guerin</h3>
									<span>Content Manager</span>
								</p>
							</div>
							<div className='flex-column member'>
								<img src='/images/setmusic/profileNafis.png'/>
								<p>
									<h3>Nafis Ahmed</h3>
									<span>Chief Relationship Officer</span>
								</p>
							</div>
							<div className='flex-column member'>
								<img src='/images/setmusic/profileJohnny.jpg'/>
								<p>
									<h3>Johnny Gabos</h3>
									<span>Chief Marketing Officer</span>
								</p>
							</div>
							<div className='flex-column member'>
								<img src='/images/setmusic/profileTurner.png'/>
								<p>
									<h3>Turner Thornberry</h3>
									<span>Operations & iOS</span>
								</p>
							</div>
							<div className='flex-column member'>
								<img src='/images/setmusic/profileBerny.jpg'/>
								<p>
									<h3>Berny Garciarivas</h3>
									<span>Front End Developer</span>
								</p>
							</div>
						</div>
					</section>
				</div>
				<Footer />
			</div>
		);
	}

});

export default About;