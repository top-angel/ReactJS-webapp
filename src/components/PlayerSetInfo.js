import React from 'react';

import convert from '../services/convert';

var PlayerSetInfo = React.createClass({
	displayName: 'PlayerSetInfo',

	render: function() {
		var strTime = convert.millisecondsToMMSS(this.props.time);

		return (
			<div className='set-info flex-column flex-fixed'>
				<div className='set-name flex'>
					{this.props.currentSet.artist + ' - ' + this.props.currentSet.event}
				</div> 
				<div className='set-time flex'>
					{strTime + ' / ' + this.props.currentSet.set_length}
				</div>
			</div>
		);
	}
});


module.exports = PlayerSetInfo;
