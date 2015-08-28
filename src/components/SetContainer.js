import React from 'react';
import SetTile from './SetTile';

var SetContainer = React.createClass({

	render: function() {
		var data = this.props.data;
		var tiles = data.map(function(set, index) {
			return(<SetTile data={set} key={index}/>);
		});
		return (
			<div className='flex-row results sets'>
				{tiles}
			</div>
		);
	}

});

module.exports = SetContainer;