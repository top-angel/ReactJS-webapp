import React from 'react';
import {Link} from 'react-router';

var NavMenu = React.createClass({
	getDefaultProps() {
		return {
			navItems: []
		};
	},
	render() {
		var links = this.props.navItems.map((nav, index) => {
			return(
				<Link 
					className='click flex flex-row' 
					to={nav.link}
					key={index}
					onlyActiveOnIndex={nav.onlyActiveOnIndex} 
					activeClassName='active'>
						<i className={nav.icon}/>
						<div>{nav.text}</div>
				</Link>
			);
		});
		
		return (
			<nav id='NavMenu' className='flex-column flex-fixed'>
				<div className='flex-container flex'>
					<div className='nav-header'>BROWSE</div>
				</div>
				{links}
				<div className='buffer-3x'/>
			</nav>
		);
	}
});

export default NavMenu;