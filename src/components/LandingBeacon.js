import React from 'react';

var LandingBeacon = React.createClass({

	render: function() {
		return (
			<div className='flex-column' id='LandingBeacon'>
				<div className='flex-column flex-3x image-container overlay-container'>
					<div className='overlay'/>
					<div className='header-medium wow bounceInLeft'>
							{'Introducing a new way to unlock music'}
					</div>
				</div>
				<div className='flex-column flex text-container'>
					<div className='buffer'/>
					<div className='wow fadeInUp'>
							{''}
					</div>
					<div className='buffer'/>
					<div className='divider center wow zoomIn'/>
					<div className='buffer'/>
					<div className='wow fadeInUp'>
							{''}
					</div>
					<div className='buffer'/>
				</div>
			</div>
		);
	}

});

module.exports = LandingBeacon;