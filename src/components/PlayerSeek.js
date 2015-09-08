import React from 'react';

var PlayerSeek = React.createClass({
	render: function() {

		var selectedSet = this.props.selectedSet;
		
		return (
			<div className="player-seek-container">
	          <div className="player-seek-position"/>
	       </div>
		);
	}
})

module.exports = PlayerSeek