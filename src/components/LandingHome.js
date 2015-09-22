import React from 'react';
import {Link} from 'react-router';

var LandingHome = React.createClass({

	scroll: function() {
		//TODO Fix this
		setTimeout(function(){
			$(window).scrollTo($('#LandingHome').height(), 400, {
				offset: -'8vh'
			});
		}, 200);
	},

	trackiOS: function() {
		mixpanel.track("iOS App Link Clicked");
	},
	trackAndroid: function() {
		mixpanel.track("Android App Link Clicked");
	},
	
	render: function() {
		return (
			<div className='flex-column' id='LandingHome'>
				<h1 className='center wow zoomIn'>Setmine</h1>
				<h2 className='center wow zoomIn'>Relive your favorite sets</h2>
				<div className='flex-row center'>
				    <a href='http://bit.ly/SetmineiOS' onClick={this.trackiOS} title='view on App Store' className='fa fa-apple fa-fw fa-4x wow fadeInLeft click'/>
				    <a href='http://bit.ly/SetmineAndroid' onClick={this.trackAndroid} title='view on Google Play'className='fa fa-android fa-fw fa-4x wow fadeInRight click'/>
				</div>
				<Link to='/sets' className='header-small center click wow fadeInUp' id='listen-now'>Listen Now</Link>
				<i className='fa fa-chevron-down center click wow slideInUp' onClick={this.scroll}/>
          </div>
		);
	}

});

module.exports = LandingHome;