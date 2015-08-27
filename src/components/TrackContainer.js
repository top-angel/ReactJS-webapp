import React from 'react';
// import TrackTile from './TrackTile';

//FIX THIS SHIT
var TrackContainer = React.createClass({

	render: function() {
		var data = this.props.data;
		var tiles = data.map(function(set) {
			// return(<TrackTile data={set} key={set.id}/>);
		});
		return (
			<div className='flex-row results flex tracks'>
				{tiles}
			</div>
		);
	}

});

module.exports = TrackContainer;