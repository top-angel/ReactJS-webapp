import React from 'react';
import { Link } from 'react-router';

const HomeSidebar = React.createClass({

	contexTypes: {
		user: React.PropTypes.func
	},

	render() {
		return (
			<div id='HomeSidebar'className='flex-column flex-fixed'>
				{/*<div className='flex flex-column user-background hidden'>
					<img className='center' src='' />
					<div className='center'>{this.props.user.first_name + ' ' + this.props.user.last_name}</div>
				</div>*/}
				<div className='flex-3x flex-column user-nav'>
					<div className='flex flex-row nav-header'>
						<i className='fa fa-2x fa-user center'/>
						{/*<div className='center'>{this.context.user.first_name + ' ' + this.context.user.last_name}</div>*/}
					</div>
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

export default HomeSidebar;