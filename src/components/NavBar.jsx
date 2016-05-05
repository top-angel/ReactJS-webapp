import React, {PropTypes} from 'react';
import {Motion, spring, presets} from 'react-motion';
import Base from './Base';
import Link from 'react-router/lib/Link';
import Icon from './FaIcon';
import ToolTip from './ToolTip';
import Ink from 'react-ink';

export default class NavBar extends Base {
	constructor(props) {
		super(props);
	}
	render() {
		let height = ((window.innerHeight - 64) / window.innerHeight) * 100 + '%';
		return (
			<nav className='NavBar' style={{ height: height }}>
				<Link to='/home' activeClassName='active'>
					<Icon size={24}>home</Icon>
					<ToolTip>Home</ToolTip>
					<Ink />
				</Link>
				<Link to='/sets' activeClassName='active'>
					<Icon size={24}>music</Icon>
					<ToolTip>Sets</ToolTip>
					<Ink />
				</Link>
				<Link to='/events' activeClassName='active'>
					<Icon size={24}>calendar</Icon>
					<ToolTip>Events</ToolTip>
					<Ink />
				</Link>
				<Link to='/artists' activeClassName='active'>
					<Icon size={24}>users</Icon>
					<ToolTip>Artists</ToolTip>
					<Ink />
				</Link>
			</nav>
		);
	}
}

NavBar.contextTypes = {
	push: PropTypes.func
};