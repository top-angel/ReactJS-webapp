import React from 'react';

var PlayerControl = React.createClass({

	displayName: 'PlayerControls',
	togglePlay: function() {
		//How am I gonna do this?
	},
	render: function() {

		var selectedSet = this.props.selectedSet;
		var playingClass = 'fa center fa-pause';
		var pausedClass = 'fa center fa-play';

		return (
			<div className="player-image-container overlay-container click" onClick={this.togglePlay}>
		        <div className="overlay set-flex">
		            <i className={playingClass}/>
		        </div>
		        <img />
		    </div>
		);
	}
});

module.exports = PlayerControl;