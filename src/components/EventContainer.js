import React from 'react';
import EventTile from './EventTile';

var EventContainer = React.createClass({

	render: function() {
		var data = this.props.events;

		if(data.length == 0 || data == undefined) {
			var tiles = <p className='flex error'>
								No Upcoming Events Found. <br/>
								Check back soon. We're Adding more every day!
							</p>
		} else {
			var tiles = data.map(function(set) {
				return(<EventTile data={set} key={set.id}/>);
			});
		}

		return (
			<div className={this.props.containerClass} id={this.props.containerId}>
				{tiles}
			</div>
		);
	}

});

module.exports = EventContainer;