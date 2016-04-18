import React from 'react';
import {fadeTransition} from '../services/animations';

var LandingApp = React.createClass({

	componentDidMount() {
		$.scrollTo(0,0);

		var activeSlide = 'fa fa-fw fa-circle click';
		var inactiveSlide = 'fa fa-fw fa-circle-o click';
		var slides = $('.slide'),
			dots = $('.slide-controls i'),
			sLength = slides.length,
			current,
			changeTimeout;

		function moveTo(newIndex) {
			var i = newIndex;
			if(newIndex == 'prev') {
				i = (current > 0) ? (current - 1) : (sLength - 1);
			}
			if(newIndex =='next') {
				i = (current < sLength - 1) ? (current + 1): 0;
			}
			dots.attr('class', inactiveSlide).eq(i).attr('class', activeSlide);
			fadeTransition(slides, slides.eq(i));
			current = i;
			clearTimeout(changeTimeout);
			changeTimeout = setTimeout(function() {
				moveTo('next');
			}, 15000);
		}

		//change slides by clicking on dots
		dots.click(function() {
			var i = dots.index(this);
			moveTo(i);
		});

		//initialize slider on load
		moveTo('next');
	},

	componentWillUnmount() {
		clearTimeout();
	},

	render() {
		return (
			<div className='flex-column' id='LandingApp'>
				<div className='flex-row slide slide-1 animated fadeIn'>
					<div className='flex-column flex-fixed text-container'>
						<h1 className='wow bounceInLeft'>
							Say goodbye to missing a live performance
						</h1>
						<p className='wow bounceInLeft'>
							Listen to any live set or recorded mix completely free. You can relive your favorite events, or catch up on the ones you missed.
						</p>
						<p className='wow bounceInLeft'>
							Search for your favorite tracks and hear the results within a set. We'll fast-forward you right where the artist drops the track.
						</p>
					</div>
					<div className='flex-column flex-fixed image-container'>
					   <img className='center wow slideInUp' src='/images/slide-1.jpg' />
					</div>
				</div>

				<div className='flex-row slide slide-2 hidden'>
					<div className='flex-column flex-fixed text-container animated fadeIn'>
					   <h1 className='animated bounceInLeft'>
					   		Discover upcoming events near you
					   </h1>
					   <p className='animated bounceInLeft'>
							We streamlined event discovery so you can find local and national events, view lineups, and purchase tickets within the app.
					   </p>
					   <p className='animated bounceInLeft'>
							Planning a trip? See who's performing at venues near your destination by searching any city for events.
					   </p>
					</div>
					<div className='flex-column flex-fixed image-container animated fadeIn'>
					   <img className='center' src='/images/slide-2.jpg' />
					</div>
				</div>
				
	          <div className='flex-row slide slide-3 animated fadeIn hidden'>
					<div className='flex-column flex-fixed text-container'>
						<h1 className='animated bounceInLeft'>
							Your favorite music on demand
						</h1>
						<p className='animated bounceInLeft'>
							Create an account to save your favorite sets.
							<br/>
							<br/>
							Your stream includes new sets, upcoming events, and unlockable content from your favorite artists.
						</p>
					</div>
					<div className='flex-column flex-fixed animated fadeIn image-container'>
						<img className='center' src='/images/slide-3.jpg' />
					</div>
          	</div>
				<div className='flex-row slide-controls'>
					<i className={'fa fa-fw fa-circle click'} id='slide-1'/>
					<i className={'fa fa-fw fa-circle-o click'} id='slide-2'/>
					<i className={'fa fa-fw fa-circle-o click'} id='slide-3'/>
				</div>
			</div>
		);
	}
});

export default LandingApp