import React from 'react';
import SetTile from './SetTile';

var SetContainer = React.createClass({

	render: function() {
		var tiles = this.props.data.map(function(set) {
			return(<SetTile data={set} key={set.id}/>)
		});
		return (
			<div className='results-container flex-row flex'>
				{tiles}
			</div>
		);
	}

});

module.exports = SetContainer;