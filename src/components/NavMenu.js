import React from 'react';
import {Link} from 'react-router';

var NavMenu = React.createClass({

	render: function() {
		return (
			<div id="nav-menu" className='flex-column'>
				{this.props.items.map(function(nav){
					return(
						<Link className='nav-list-item click flex set-flex' to={nav.link}>
							<div className='center'>{nav.text}</div>
						</Link>
					); 
				})}
			</div>
		);
	}

});

module.exports = NavMenu;