import React, {PropTypes} from 'react';
import Base from './Base';

import Link from 'react-router/lib/Link';
import Icon from './FaIcon';

export default class NavBar extends Base {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<nav id='NavBar' className='flex-column'>
				<Link to='/home' className='flex-container' activeClassName='active'>
					<Icon size={24}>home</Icon>
				</Link>
				<Link to='/sets' className='flex-container' activeClassName='active'>
					<Icon size={24}>music</Icon>
				</Link>
				<Link to='/events' className='flex-container' activeClassName='active'>
					<Icon size={24}>calendar</Icon>
				</Link>
				<Link to='/artists' className='flex-container' activeClassName='active'>
					<Icon size={24}>users</Icon>
				</Link>
			</nav>
		);
	}
}

NavBar.contextTypes = {
	push: PropTypes.func
};