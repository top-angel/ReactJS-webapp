import React from 'react';
import {RouteHandler} from 'react-router';
import Routes from '../index';
// import Routes from '../Routes';
import NavMenu from './NavMenu';

var SetsView = React.createClass({

	render: function() {
		var navItems = [
			{
				text: 'Recent',
				link: 'recent',
				icon: 'fa fa-fw fa-clock-o'
			},
			{
				text: 'Popular',
				link: 'popular',
				icon: 'fa fa-fw fa-heart'
			},
			{
				text: 'Festivals',
				link: 'festivals',
				icon: 'fa fa-fw fa-flag'
			},
			{
				text: 'Mixes',
				link: 'mixes',
				icon: 'fa fa-fw fa-headphones'
			},
			{
				text: 'Activities',
				link: 'activities',
				icon: 'fa fa-fw fa-bicycle'
			}
		];
		return (
			<div id='SetsView' className='flex-row view'>
				<NavMenu items={navItems}/>
				<RouteHandler appState={this.props.appState} push={this.props.push}/>
			</div>
		);
	}

});

module.exports = SetsView;