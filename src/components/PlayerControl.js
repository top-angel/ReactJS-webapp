import React from 'react';
import playerService from '../services/playerService.js';
import constants from '../constants/constants';

var PlayerControl = React.createClass({

	displayName: 'PlayButton',
	getDefaultProps: function() {
		return {
			appState: {}
		};
	},

	componentDidMount: function() {
		var self = this;
		$(document.body).keypress(function(e) {
			var search = document.getElementById('search');
			if(e.charCode == 32 && search != document.activeElement) {
				e.preventDefault();
				self.togglePlay();
			} else {
				return;
			}
		});
	},

	togglePlay: function() {
		var sound = this.props.appState.get('sound');
		var playing = this.props.appState.get('playing');
		var push = this.props.push;

		playerService.togglePlay(sound);
		push({
			type: 'SHALLOW_MERGE',
			data: {
				playing: !playing
			}	
		})
	},

	render: function() {
		var currentSet = this.props.appState.get('currentSet');
		var playing = this.props.appState.get('playing');

		if(!!playing) {
			var playingClass = 'fa center fa-pause';
		} else {
			var playingClass = 'fa center fa-play';
		}

		return (
			<div className='click' id='PlayButton' onClick={this.togglePlay}>
				<div className='overlay set-flex'>
					<i className={playingClass}/>
				</div>
				<img src={constants.S3_ROOT_FOR_IMAGES+'small_'+currentSet.artistimageURL} />
			</div>
		);
	}
});

module.exports = PlayerControl;