import React from 'react';
import {togglePlay} from '../services/playerService';
import {S3_ROOT_FOR_IMAGES} from '../constants/constants';

const PlayerControl = React.createClass({
	contextTypes: {
		push: React.PropTypes.func
	},

	componentDidMount() {
		// TODO do this without jquery
		$(document.body).on('keypress', (e) => {
			var search = document.getElementById('search');
			var key = e.charCode;

			switch(true) {
				case(key == 32 && search != document.activeElement):
					e.preventDefault();
					this.togglePlay();
					break;
				case(key >= 97 && key <= 122 && document.location.pathname != '/events'):
					search.focus();
					break;
				case(key >= 65 && key <= 90 && document.location.pathname != '/events'):
					search.focus();
					break;
			}
		})
	},

	togglePlay() {
		var sound = this.props.appState.get('sound');
		var playing = this.props.appState.get('playing');

		togglePlay(sound);
		this.context.push({
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
			var playButtonIcon = 'fa center fa-pause';
		} else {
			var playButtonIcon = 'fa center fa-play';
		}

		var image = {
			backgroundImage: `url('${S3_ROOT_FOR_IMAGES+currentSet.artistImage}')`,
			backgroundSize: '100% 100%'
		};

		return (
			<div className='click flex-container' id='PlayButton' onMouseUp={this.togglePlay} style={image}>
				<i className={playButtonIcon}/>
			</div>
		);
	}
});

export default PlayerControl;