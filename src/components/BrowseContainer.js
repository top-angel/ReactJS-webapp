import React from 'react';
import BrowseTile from './BrowseTile';

var BrowseContainer = React.createClass({

	render: function() {
		var tiles = this.props.data.map(function(set) {
			return(<BrowseTile data={set} key={set.id}/>)
		});
		return (
			<div className='results-container flex-row flex'>
				{tiles}
			</div>
		);
	}

});

module.exports = BrowseContainer;