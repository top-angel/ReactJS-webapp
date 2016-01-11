import React from 'react';
import NavMenu from './NavMenu';

var Sets = React.createClass({
	render() {
		var navItems = [
			{
				text: 'Recent',
				link: '/sets',
				icon: 'fa fa-fw fa-clock-o',
				onlyActiveOnIndex: true
			},
			{
				text: 'Popular',
				link: '/sets/popular',
				icon: 'fa fa-fw fa-heart',
				onlyActiveOnIndex: false
			},
			{
				text: 'Festivals',
				link: '/sets/festivals',
				icon: 'fa fa-fw fa-flag',
				onlyActiveOnIndex: false
			},
			{
				text: 'Mixes',
				link: '/sets/mixes',
				icon: 'fa fa-fw fa-headphones',
				onlyActiveOnIndex: false
			},
			{
				text: 'Activities',
				link: '/sets/activities',
				icon: 'fa fa-fw fa-bicycle',
				onlyActiveOnIndex: false
			}
		];
		
		return (
			<div id='SetsView' className='flex-row view'>
				<NavMenu navItems={navItems}/>
				{
					React.cloneElement(this.props.children, {
						appState: this.props.appState,
						push: this.props.push
					})
				}
			</div>
		);
	}
});

export default Sets;