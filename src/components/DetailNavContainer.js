import React from 'react';
import {Link} from 'react-router';

var DetailNavContainer = React.createClass({

	render: function() {
		var navTitles = this.props.navTitles;
		var titles = navTitles.map(function(title, index) {
			return(
				<Link className='center click flex-fixed' 
					key={index} 
					to={title.to}
				>
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