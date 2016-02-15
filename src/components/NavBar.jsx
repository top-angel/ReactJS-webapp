import React, {PropTypes} from 'react';
import {Motion, spring, presets} from 'react-motion';
import Base from './Base';
import Link from 'react-router/lib/Link';
import Icon from './FaIcon';
import ToolTip from './ToolTip';

export default class NavBar extends Base {
	constructor(props) {
		super(props);
	}
	render() {
		let height = ((window.innerHeight - 64) / window.innerHeight) * 100 + '%';
		return (
			<nav id='NavBar' className='flex-column' style={{ height: height }}>
				<Link to='/home' className='flex-container' activeClassName='active'>
					<Icon size={24}>home</Icon>
					<ToolTip><p>Home</p></ToolTip>
				</Link>
				<Link to='/sets' className='flex-container' activeClassName='active'>
					<Icon size={24}>music</Icon>
					<ToolTip><p>Sets</p></ToolTip>
				</Link>
				<Link to='/events' className='flex-container' activeClassName='active'>
					<Icon size={24}>calendar</Icon>
					<ToolTip><p>Events</p></ToolTip>
				</Link>
				<Link to='/artists' className='flex-container' activeClassName='active'>
					<Icon size={24}>users</Icon>
					<ToolTip><p>Artists</p></ToolTip>
				</Link>
			</nav>
		);
	}
}

NavBar.contextTypes = {
	push: PropTypes.func
};