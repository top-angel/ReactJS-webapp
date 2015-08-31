import React from 'react';
import EventTile from './EventTile';

var EventBrowseContainer = React.createClass({
	render: function() {
		var data = this.props.data;
		var tiles = data.map(function(set) {
			return(<EventTile data={set} key={set.id}/>)
		});
		return (
			<div className='flex-row results events'>
				{tiles}
			</div>
		);
	}

});

module.exports = EventBrowseContainer;