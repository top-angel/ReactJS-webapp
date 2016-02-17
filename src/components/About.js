import React from 'react';
import Icon from './FaIcon';
import Footer from './Footer';

const beaconLink = 'http://www.ibeacon.com/what-is-ibeacon-a-guide-to-beacons/';
const setmineIos = 'http://bit.ly/SetmineiOS';
const setmineAndroid = 'http://bit.ly/SetmineAndroid';
const setstoryIos = 'https://itunes.apple.com/us/app/setstory/id1044445159?mt=8';
const setstoryAndroid = 'https://play.google.com/store/apps/details?id=com.setmine.setstory';

export default class About extends React.Component {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
		this.context.push({
			currentPage: 'Setmusic',
			showNavbar: false
		});
	}
	componentWillUnmount() {
		this.context.push({
			showNavbar: true
		});
	}
	render() {
		return (
			<div>
				<div id='About' className='flex-column'>
					<div className='contact flex-row'>
						<p>Call us and personally talk to one of the founders</p>
						<Icon size={18} style={{margin: 'auto 2rem'}}>phone</Icon>
						<p style={{fontFamily: 'Avenir Bold'}}>(954) 655-3231</p>
					</div>
					<section className='main flex-container'>
						<h2 className='center'>We use music to bring people to retailers</h2>
					</section>
					<section className='mission flex-column'>
						<h3>Our mission</h3>
						<h5>A new way to pay for music</h5>
						<p>We believe that artists can release free content to fans while receiving higher royalties than the industry standard.</p>
						<p>Artists have access to multiple streaming platforms, yet monthly fees and digital purchases keep fans away.</p>
						<p>Our beacon network delivers people to locations by allowing artists to "lock" new music at bars, venues, & retailers that only pay when a user walks in and unlocks content.</p>
						<a target='_blank' href={beaconLink}>
							<h5>Learn more about beacons</h5>
						</a>
					</section>
					<section className='image'/>
					<section className='products flex-column'>
						<h1>Products</h1>
						<div style={{marginBottom: '4rem'}}>
							<div className='flex-column product'>
								<img src='images/setmusic/setmine-logo.png'/>
								<h2 style={{margin: '1rem'}}>Setmine</h2>
								<p>The music lover's app for hearing sets, discovering events, & unlocking music</p>
								<div className='flex-row' style={{margin:'1rem auto'}}>
									<a target='_blank' href={setmineIos}>
										<Icon size={48} fixed>apple</Icon>
									</a>
									<a target='_blank' href={setmineAndroid}>
										<Icon size={48} fixed>android</Icon>
									</a>
								</div>
							</div>
							<div className='flex-column product'>
								<img src='images/setmusic/setstory-logo.png'/>
								<h2 style={{margin: '1rem'}}>Setstory</h2>
								<p>The retailer's tool for accepting artist offers & increasing foot-traffic</p>
								<div className='flex-row' style={{margin:'1rem auto'}}>
									<a target='_blank' href={setstoryIos}>
										<Icon size={48} fixed>apple</Icon>
									</a>
									<a target='_blank' href={setstoryAndroid}>
										<Icon size={48} fixed>android</Icon>
									</a>
								</div>
							</div>
						</div>
					</section>
					<section className='goal flex-column'>
						<h3>We will provide the largest beacon network for any music platform to distribute content.</h3>
					</section>
					<section className='team flex-column'>
						<h1>Team</h1>
						<div className='flex-row' style={{padding: '0 10vw'}}>
							<div className='flex-column member'>
								<img src='images/setmusic/profileJesus.jpg'/>
								<p>
									<h4>Jesus Najera</h4>
									<p>Founder & CEO</p>
								</p>
							</div>
							<div className='flex-column member'>
								<img src='images/setmusic/profileOscar.jpg'/>
								<h4>Oscar Lafarga</h4>
								<p>Founder & CTO</p>
							</div>
							<div className='flex-column member'>
								<img src='images/setmusic/profileEvan.jpg'/>
								<h4>Evan Martinez</h4>
								<p>Lead Product Manager</p>
							</div>
							<div className='flex-column member'>
								<img src='images/setmusic/profileQuinn.png'/>
								<h4>Quinn Pruitt</h4>
								<p>Chief Design Officer</p>
							</div>
							<div className='flex-column member'>
								<img src='images/setmusic/profileJohnny.jpg'/>
								<h4>Johnny Gabos</h4>
								<p>Chief Marketing Officer</p>
							</div>
							<div className='flex-column member'>
								<img src='images/setmusic/profileBerny.jpg'/>
								<h4>Berny Garciarivas</h4>
								<p>Front End Developer</p>
							</div>
							<div className='flex-column member'>
								<img src='images/setmusic/profileChristian.png'/>
								<h4>Christian Guerin</h4>
								<p>Content Manager</p>
							</div>
							<div className='flex-column member'>
								<img src='images/setmusic/profileConner.jpg'/>
								<h4>Conner Fromknecht</h4>
								<p>Security & iOS</p>
							</div>
							{/*<div className='flex-column member'>
								<img src='images/setmusic/profileNafis.png'/>
								<h4>Nafis Ahmed</h4>
								<p>Chief Relationship Officer</p>
							</div>*/}
							
							{/*<div className='flex-column member'>
								<img src='images/setmusic/profileTurner.png'/>
								<h4>Turner Thornberry</h4>
								<p>Operations & iOS</p>
							</div>*/}
						</div>
					</section>
				</div>
				<Footer />
			</div>
		);
	}
}

About.contextTypes = {
	push: React.PropTypes.func
};