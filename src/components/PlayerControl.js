import React from 'react';
import playerService from '../services/playerService.js';
import constants from '../constants/constants';

var PlayerControl = React.createClass({

	displayName: 'PlayButton',
	getDefaultProps() {
		return {
			appState: {}
		};
	},

	componentDidMount() {
		var self = this;

		$(document.body).on('keypress', function(e) {
			var search = document.getElementById('search');
			var key = e.charCode;

			switch(true) {
				case(key == 32 && search != document.activeElement):
					e.preventDefault();
					self.togglePlay();
					break;
				case(key >= 97 && key <= 122 && document.location.pathname != '/events'):
					search.focus();
					break;
				case(key >= 65 && key <=90 &&document.location.pathname != '/events'):
					search.focus();
					break;
			}
		})
	},

	togglePlay() {
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

	render() {
		var currentSet = this.props.appState.get('currentSet');
		var playing = this.props.appState.get('playing');

		if(!!playing) {
			var playingClass = 'fa center fa-pause';
		} else {
			var playingClass = 'fa center fa-play';
		}

		var image = {
			backgroundImage: "url('"+constants.S3_ROOT_FOR_IMAGES+'small_'+currentSet.artistimageURL+"')",
			backgroundSize: '100% 100%'
		};

		return (
			<div className='click flex-container' id='PlayButton' onMouseUp={this.togglePlay} style={image}>
				<i className={playingClass}/>
				<img className='hidden' src={constants.S3_ROOT_FOR_IMAGES+'small_'+currentSet.artistimageURL} />
			</div>
		);
	}
});

module.exports = PlayerControl;