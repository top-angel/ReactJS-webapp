import React from 'react';
import {Link} from 'react-router';

var DetailNavContainer = React.createClass({
	
	getDefaultProps: function() {
		return {
			navTitles: []
		};
	},
	render: function() {
		var navTitles = this.props.navTitles || [];
		var titles = navTitles.map(function(title, index) {
			return(
				<Link className='center click flex-fixed' 
					key={index} 
					to={title.to}
					activeClassName='active'>
					{title.title}
				</Link>
			);
		});
		return (
			<div className="flex-row links-container">{titles}</div>
		);
	}
		
});

module.exports = DetailNavContainer;