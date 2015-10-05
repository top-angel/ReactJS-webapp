import React from 'react';
import Footer from './Footer';

var Setmusic = React.createClass({

	componentDidMount: function() {
		$(window).scrollTo(0, 0);
		mixpanel.track("About Page Open");
	},

	render: function() {
		return (
			<div id='Setmusic'>
				<section id='landing-page' className='flex-column'>
					<h1>SETMUSIC</h1>
					<h2>Delivering Foot-Traffic With Music</h2>
				</section>

				<section id='video' className='flex-container'>
					<iframe width='70%' height='70%' src="https://www.youtube.com/embed/r5XCYcxmR8s?rel=0" frameborder="0" allowfullscreen className='center'></iframe>
				</section>

				<section id='company-purpose' className='flex-column'>
					<div className='text flex-column'>
						<div className='center'>Retailers need foot traffic...</div>
						<div className='center'>...Artists need to reach fans</div>
					</div>
				</section>

				<section id='solution'>
					<div className='image-container flex-container flex-fixed'>
						<img src='/images/setmusic/beacons-music.png'/>
					</div>
					<aside>
						<div className='flex-fixed flex-row'>
							<i className='fa fa-fw fa-users'/>
							<div>We identify fans at live events</div>
						</div>
						<div className='flex-fixed flex-row'>
							<i className='fa fa-fw fa-unlock-alt'/>
							<div>And lead them to retailers with music</div>
						</div>
					</aside>
				</section>

				<section id='products'>
					<div className='overview'>
						<h1>Products</h1>
					</div>
					<div className='setmine product flex-row'>
						<div className='image-container flex-fixed'>
							<img className='center' src='/images/setmusic/setmine-screen.png'/>
						</div>
						<aside className='flex-fixed flex-column'>
							<div className='flex-column'>
								<h1>Setmine</h1>
								<img className='icon' src='/images/setmusic/setmine_navyblue.png'/>
								<a href='https://setmine.com'>
									Live Now
								</a>
							</div>
							<p className='flex-fixed flex-column'>
								Hear live sets
								<br/>
								Unlock exclusive content
								<br/>
								Discover new events
							</p>
						</aside>
					</div>
					<div className='setstory product flex-row'>
						<aside className='flex-fixed flex-column'>
							<div className='flex-column'>
								<h1>Setstory</h1>
								<img className='icon' src='/images/setmusic/setstory_navyblue.png'/>
								<a href='https://play.google.com/store/apps/details?id=com.setmine.setstory&hl=en'>
									Live Now
								</a>
							</div>
							<p className='flex-fixed flex-column'>
								Analyze foot traffic
								<br/>
								Accept artist offers
								<br/>
								Pay per unlock
							</p>
						</aside>
						<div className='image-container flex-fixed'>
							<img className='center' src='/images/setmusic/setstory-screen.png'/>
						</div>
					</div>
					<div className='setrecords product flex-column'>
						<h1>Setrecords</h1>
						<img className='icon' src='/images/setmusic/setrecords_navyblue.png'/>
						<a href='https://setmine.com/setrecords/demo'>
							Live Now
						</a>
						<p>
							Release content
							<br/>
							<br/>
							View metrics
							<br/>
							<br/>
							Collect revenue
						</p>
					</div>
				</section>

				<section className='business flex-column'>
					<h1>Business model</h1>
					<h3>Distributing music & driving foot traffic to retailers</h3>
				</section>

				<section id='model'>
					<div className='flex-column'>
						<h6>1</h6>
						<img src='/images/setmusic/model-setrecords.png'/>
						<p>Artist locks exclusive music to a beacon at a venue</p>
					</div>
					<div className='flex-column'>
						<h6>2</h6>
						<img src='/images/setmusic/model-setmine.png'/>
						<p>Users discover upcoming events & offers</p>
					</div>
					<div className='flex-column'>
						<h6>3</h6>
						<img src='/images/setmusic/model-user.png'/>
						<p> Users travel to venue & unlock content</p>
					</div>
					<div className='flex-column'>
						<h6>4</h6>
						<img src='/images/setmusic/model-setstory.png'/>
						<p>Venue pays per content unlock</p>
					</div>
				</section>

				<section className='why'>
					<h1>Why Now?</h1>
				</section>

				<section id='why' className='flex-row'>
					<div className='circle bg left flex-container'>
						<i className='fa fa-fw center fa-apple'/>
					</div>
					<div className='circle main flex-container'>
						<div className='center'>The music war has begun. Everyone needs a competitive advantage.</div>
					</div>
					<div className='circle bg right flex-container'>
						<i className='fa fa-fw center fa-spotify'/>
					</div>
				</section>

				<section id='advantages' className='flex-column'>
					<p>Music platforms have evolved, yet the way we pay for music hasn't.</p>
					<p>Beacons are gaining traction across multiple industries. We bring people to beacons.</p>
				</section>

				<section className='tech'>
					<h1>Technology generates new revenue models</h1>
				</section>

				<section id='tech-changes' className='flex-row'>
					<div className='flex-column'>
						<img className='center' src='/images/setmusic/vinyl.png'/>
						<p>
							1960<br/>VINYL
						</p>
					</div>
					<div className='flex-column'>
						<img className='center' src='/images/setmusic/cd.png'/>
						<p>
							1980<br/>CD
						</p>
					</div>
					<div className='flex-column'>
						<img className='center' src='/images/setmusic/streaming.png'/>
						<p>
							2000<br/>STREAMING
						</p>
					</div>
					<div className='flex-column'>
						<img className='center' src='/images/setmusic/beacon.png'/>
						<p>
							2020<br/>BEACONS
						</p>
					</div>
				</section>

				<section id='platforms'>
					<div className='heading flex-column'>
						<h1>Our Goal</h1>
						<h3>Unlock on all music streaming platforms</h3>
					</div>
					<div className='background'></div>
				</section>

				<div className='heading white'>
					<h1>The Team</h1>
				</div>

				<section id='team' className='flex-row'>
					<div className='member flex-column'>
						<h1>Jesus Najera</h1>
						<img src='/images/setmusic/profileJesus.jpg'/>
						<p>
							Founder & CEO<br/>
							UF. JP Morgan
						</p>
					</div>
					<div className='member flex-column'>
						<h1>Oscar Lafarga</h1>
						<img src='/images/setmusic/profileOscar.jpg'/>
						<p>
							Founder & CTO<br/>
							USC. Motorola
						</p>
					</div>
					<div className='member flex-column'>
						<h1>Conner Fromknecht</h1>
						<img src='/images/setmusic/profileConner.jpg'/>
						<p>
							Security & Mobile<br/>
							MIT. Box
						</p>
					</div>
					<div className='member flex-column'>
						<h1>Evan Martinez</h1>
						<img src='/images/setmusic/profileEvan.jpg'/>
						<p>
							VP of Product Dev<br/>
							MIT. nToggle
						</p>
					</div>
				</section>
				<Footer/>
			</div>
		);
	}

});

module.exports = Setmusic;