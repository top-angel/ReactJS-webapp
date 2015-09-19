import React from 'react';
import { Link } from 'react-router';

var HomeSidebar = React.createClass({

	getDefaultProps: function() {
		return {
			user: {}
		};
	},

	getProfilePic () {
		
	},

	render: function() {
		var name = this.props.user.first_name + ' ' + this.props.user.last_name;

		return (
			<div id='HomeSidebar'className='flex-column flex-fixed'>
				<div className='flex flex-column overlay-container user-background'>
					<img className='center' src='' />
					<div className='center'>{name}</div>
				</div>
				<div className='flex-3x flex-column user-nav'>
					<Link className='nav-button click flex flex-row' to='/user' activeClassName='active' onlyActiveOnIndex={true}>
					   <div>Favorites</div>
					</Link>
					<Link className='nav-button click flex flex-row' to='/user/sets' activeClassName='active'>
					   <div>New Sets</div>
					</Link>
					<Link className='nav-button click flex flex-row' to='/user/events' activeClassName='active'>
					   <div>New Events</div>
					</Link>
					<div className='buffer-3x'/>
				</div>
			</div>
		);
	}

});

module.exports = HomeSidebar;