import React from 'react';
import {Link, Navigation} from 'react-router';

var HomeSidebar = React.createClass({
	mixins: [Navigation],
	render: function() {
		return (
			<div className="flex-column flex-fixed home-sidebar">
				<div className="flex flex-column overlay-container user-background">
				  <img className="user-image center" src='' />
				</div>
				<div className="flex-3x flex-column user-nav">
					<Link className="nav-button click flex flex-row" to='user-favorites'>
					   <div>Favorites</div>
					</Link>
					<Link className="nav-button click flex flex-row" to='user-new-sets'>
					   <div>New Sets</div>
					</Link>
					<Link className="nav-button click flex flex-row" to='user-new-events'>
					   <div>New Events</div>
					</Link>
					<div className='buffer-3x'/>
				</div>
			</div>
		);
	}

});

module.exports = HomeSidebar;