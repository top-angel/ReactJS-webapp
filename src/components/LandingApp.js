var React = require('react');
var LandingSlideControls = require('./LandingSlideControls');

var LandingApp = React.createClass({

	render: function() {
		return (
			<div className="flex-column landing-view overlay-container" id="landing-2">
	            <div className="flex-row overlay-container slide slide-1 hidden">
	                <div className="flex-column flex-fixed text-container">
	                    <div className="buffer"></div>
	                    <div className="header-medium center wow bounceInLeft">Unlock exclusive content from your favorite artists</div>
	                    <div className="buffer"></div>
	                    <div className="center wow bounceInLeft">
	                        {'We\'re no strangers to love'}
	                    </div>
	                    <div className="buffer-5x"></div>
	                </div>
	                <div className="flex-column flex-fixed image-container">
	                    <img className="center wow slideInUp" src="images/slide-2.jpg" />
	                </div>
	            </div>
	            <div className="flex-row overlay-container slide slide-2 hidden">
	                <div className="flex-column flex-fixed text-container">
	                    <div className="buffer"></div>
	                    <div className="header-medium center animated bounceInLeft">Say goodbye to missing a live performance</div>
	                    <div className="buffer"></div>
	                    <div className="center animated bounceInLeft">{'Setmine lets you listen any live set or recorded mix completely free, allowing you to relive your favorite events, or catch up on the ones you missed.'}</div>
	                    <div className="buffer-5x"></div>
	                </div>
	                <div className="flex-column flex-fixed image-container">
	                    <img className="center animated slideInUp" src="images/slide-2.jpg" />
	                </div>
	            </div>
	            <div className="flex-row overlay-container slide slide-3">
	                <div className="flex-column flex-fixed text-container">
	                    <div className="buffer"></div>
	                    <div className="header-medium center animated bounceInLeft">See which song is playing with interactive tracklists</div>
	                    <div className="buffer"></div>
	                    <div className="center animated bounceInLeft">{'Search for your favorite tracks and hear the results in live set form. We\'ll fast-forward you right where the artist drops the track'}</div>
	                    <div className="buffer-5x"></div>
	                </div>
	                <div className="flex-column flex-fixed image-container">
	                    <img className="center animated fadeIn" src="images/slide-3.jpg" />
	                </div>
	            </div>
	            <div className="flex-row overlay-container slide slide-4 hidden">
	                <div className="flex-column flex-fixed text-container">
	                    <div className="buffer"></div>
	                    <div className="animated bounceInLeft">Setmine's Activities feature makes it easy to find the perfect set for whatever you're doing.</div>
	                    <div className="buffer"></div>
	                    <div className="animated bounceInLeft">Get pumped to workout to Skrillex. Relax and chill with Kygo and Thomas Jack. Zone into a study sesh with Above & Beyond.</div>
	                    <div className="buffer"></div>
	                    <div className="divider center animated zoomIn"></div>
	                    <div className="buffer"></div>
	                    <div className="animated bounceInLeft">Save your favorite sets for quick and easy listening with My Sets</div>
	                    <div className="buffer"></div>
	                    <div className="animated bounceInLeft">You can enjoy these features with a quick one-time facebook login.</div>
	                    <div className="buffer"></div>
	                </div>
	                <div className="flex-column flex-fixed image-container">
	                    <img className="center animated slideInUp" src="images/slide-4.jpg" />
	                </div>
	            </div>
	            <LandingSlideControls />
	        </div>
		);
	}
});

module.exports = LandingApp