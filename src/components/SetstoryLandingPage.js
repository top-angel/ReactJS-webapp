import React, {PropTypes} from 'react';
import Icon from './FaIcon';
import Footer from './Footer';

var SetstoryLandingPage = React.createClass({
	componentDidMount: function() {
		$(window).scrollTo(0,0);
		this.context.push({
			currentPage: 'Setstory',
			showNavbar: false
		});
		mixpanel.track("Setstory About Page Open");
	},
	componentWillUnmount() {
		this.context.push({
			showNavbar: true
		});
	},
	render() {
		return (
			<div id='SetstoryLandingPage'>	

				<section className='mainLanding flex-column'>
					<div className='mainLogo flex-row'>
						<img src='/images/setstory-logo-white.png'/>
						<h2>Setstory</h2>
					</div>
					<div className='aquire flex'>
						<div className='uv flex-column flex-fixed'>
							<h2 style={{margin:'2rem'}}>Acquire new customers by parterning with musicians.</h2>
							<div className='flex-row setstory-apps center'>
								<a href='https://itunes.apple.com/us/app/setstory/id1044445159?mt=8' className='fa fa-apple fa-fw center'/>
								<a href='https://play.google.com/store/apps/details?id=com.setmine.setstory' className='fa fa-android fa-fw center'/>
							</div>
						</div>
						<div className='landingPhones flex-fixed '/>
					</div>
				</section>

				<section className='beacon flex-column'>
					<img src='/images/setstory/beaconIcon.png'/>
					<h4 style={{width: '60%'}}>We built a beacon network that brings customers to you by allowing artists to lock new music in venues, bars, & retail locations.</h4>
				</section>

				<section className='model'>
					<div className='col-xs-3'>
						<p className='caption'>1</p>
						<img src='/images/setmusic/model-setrecords.png'/>
						<p>Artist locks exclusive music to a beacon at a venue</p>
					</div>
					<div className='col-xs-3'>
						<p className='caption'>2</p>
						<img src='/images/setmusic/model-setmine.png'/>
						<p>Users discover upcoming events & offers</p>
					</div>
					<div className='col-xs-3'>
						<p className='caption'>3</p>
						<img src='/images/setmusic/model-user.png'/>
						<p> Users travel to venue & unlock music</p>
					</div>
					<div className='col-xs-3'>
						<p className='caption'>4</p>
						<img src='/images/setmusic/model-setstory.png'/>
						<p>Venue pays per content unlock</p>
					</div>
				</section>

				<section className='offer flex-column'>
					<h4>ACTIVATE AN OFFER TO GET STARTED</h4>
					<div className='text-container flex-row flex-fixed'>
						<div className='text flex-column flex'>
							<div className='custom flex-row'>
								<h4>Custom Offer</h4>
								<p>Attract potential customers with an additional promotion or discount</p>
							</div>
						</div>
						<div className='text flex-column flex'>
							<div className='inbox flex-row'>
								<h4>Inbox</h4>
								<p>You pay nothing until a customer unlocks an offer which you must approve beforehand</p>
							</div>
						</div>
					</div>
				</section>

				<section className='metrics flex-column'>
					<h3>FULL TRANSPARENCY THROUGH INSIGHTFUL METRICS</h3>
					<div className='morty flex'>
						<div className='metricsPic flex-fixed'/>
						<section className='text-container flex-column'>
							<div className='text flex-row'>
								<img src='/images/setstory/iconClock.png'/>
								<p>With Setstory, you'll see a live stream of everyone who unlocks an offer.</p>
							</div>	

							<div  className='text flex-row'>
								<img src='/images/setstory/iconChart.png' />
								<p>You can compare metrics from each offer to determine which artist bring you the most customers.</p>
							</div>

							<div className='text flex-row'>
								<img src='/images/setstory/iconCard.png'/>
								<p>We'll notify you before an offer ends, so you'll never see an unexpected charge.</p>
							</div>	
						</section>
					</div>
				</section>

				<Footer/>
			</div>	
		);
	}
});

SetstoryLandingPage.contextTypes = {
	push: PropTypes.func
};

export default SetstoryLandingPage;