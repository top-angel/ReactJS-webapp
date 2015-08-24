import React from 'react';
import EventTile from './EventTile';

var EventContainer = React.createClass({

	render: function() {
		var tiles = this.props.data.map(function(set) {
			return(<EventTile data={set} key={set.id}/>)
		});
		return (
			<div className='results-container flex-row flex'>
				{tiles}
			</div>
		);
	}

});

module.exports = EventContainer;