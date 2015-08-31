import React from 'react';
import NavMenu from './NavMenu';

var SetsView = React.createClass({

	render: function() {
		var navItems = [
			{
				text: 'Mixes',
				link: 'mixes'
			},
			{
				text: 'Festivals',
				link: 'festivals'
			},
			{
				text: 'Activities',
				link: 'activities'
			},
			{
				text: 'Recent',
				link: 'activities'
			}
		];
		return (
			<div className='flex-row view'>
				<NavMenu items={navItems}/>
			</div>
		);
	}

});

module.exports = SetsView;