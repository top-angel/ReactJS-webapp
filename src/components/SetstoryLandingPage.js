import React from 'react';

var SetstoryLandingPage = React.createClass({
	
	
	render: function(){
		return (
		<div className="SetstoryLandingPage">	

			<section className="mainLanding flex-column">
				<div className="mainLogo flex-row">
					<img src="/public/images/setstory-logo-white.png"/>
					<h2>Setstory</h2>
				</div>
				<div className="aquire flex-row ">
					<div className="uv flex-column">
						<p>Acquire new customers by parterning with muscians.</p>
						<div className="flex-row setstory-apps flex-fixed">
							<a href="https://itunes.apple.com/us/app/setmine/id921325688?mt=8"><i href="" className="fa fa-apple"></i></a>
							<a href="https://play.google.com/store/apps/details?id=com.setmine.setstory"><i className="fa fa-android"></i></a>
						</div>
					</div>
					<div className="landingPhones">
					</div>
				</div>
			</section>


			
			<section className="beacon flex-column">
				<div>
					<img src="/public/images/setstory/beaconicon.png"/>
				</div>
				<div className="beaconText">
					<p>We built a beacon network that brings customers to you by allowing artist to lock new music in venues, bars, & retail locations.</p>
				</div>

			</section>
			<section id='model'>
				<div className='flex-column'>
					<h6>1</h6>
					<img src='/public/images/setmusic/model-setrecords.png'/>
					<p>Artist locks exclusive music to a beacon at a venue</p>
				</div>
				<div className='flex-column'>
					<h6>2</h6>
					<img src='/public/images/setmusic/model-setmine.png'/>
					<p>Users discover upcoming events & offers</p>
				</div>
				<div className='flex-column'>
					<h6>3</h6>
					<img src='/public/images/setmusic/model-user.png'/>
					<p> Users travel to venue & unlock content</p>
				</div>
				<div className='flex-column'>
					<h6>4</h6>
					<img src='/public/images/setmusic/model-setstory.png'/>
					<p>Venue pays per content unlock</p>
				</div>
			</section>

			<section className="offer flex-column">
				<h1>ACTIVATE AN OFFER TO GET STARTED</h1>
				<section className=" inbox flex-row flex-fixed">
					<div className=" custom flex-column">
						<h2>Custom Offer</h2>
						<p>Attract potential customers with an additional promotion or discount</p>
					</div>
					<div className="buffer"></div>
					<div className=" approve flex-column">
						<h2>Inbox</h2>
						<p>You pay nothing until a customer unlocks an offer which you must approve beforehand</p>
					</div>
				</section>

			</section>

			<section className="metrics flex-column">
				<div className="transparency flex-column">
					<p>FULL TRANSPARENCY THROUGH INSIGHTFUL METRICS</p>
				</div>
				<section className=" morty flex-row flex-fixed">
					<div className="metricsPic">

					</div>
					<section className="metricsTxt flex-column">
						<div className="textArea">
							<div className=" text flex-row">
								<img src="/public/images/setstory/iconClock.png"/>
								<p>With Setstory, you'll see a live stream of everyone who unlocks an offer.</p>
							</div>	

							<div  className=" text flex-row">
								<img src="/public/images/setstory/iconchart.png" />
								<p>You can compare metrics from each offer to determine which artist bring you the most customers.</p>
							</div>

							<div className=" text flex-row">
								<img src="/public/images/setstory/iconCard.png"/>
								<p>We'll notify you before an offer ends, so you'll never see an unexpected charge.</p>
							</div>	
						</div>
					</section>
				</section>
			</section>
				
		</div>
	
				
			);

	}
});

module.exports = SetstoryLandingPage ;