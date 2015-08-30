import React from 'react';

var DetailNavContainer = React.createClass({

	render: function() {
		var navTitles = this.props.navTitles;
		var titles = navTitles.map(function(title, index) {
			return(
				<div className='center click flex-fixed' key={index}>
					{title}
				</div>
			);
		});
		return (
			<div className="flex-row links-container">{titles}</div>
		);
	}
		
});

module.exports = DetailNavContainer;