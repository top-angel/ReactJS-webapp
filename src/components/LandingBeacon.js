import React from 'react';

var LandingBeacon = React.createClass({

	render: function() {
		return (
			<div className='flex-row' id='LandingBeacon'>
				<div className='text-container flex-column'>
					<h1>Introducing a new way to get music first</h1>
					<p>
						Artists release exclusive content on Setmine, which you can unlock at specific venues using beacon techology. 
						<br/>
						<br/>
						All you have to do is go to a venue. Once you're there, Setmine unlocks the content on your account for free listening anytime.
					</p>
				</div>
			</div>
		);
	}

});

module.exports = LandingBeacon;