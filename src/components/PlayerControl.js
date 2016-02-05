import React, {PropTypes} from 'react';
import {togglePlay} from '../services/playerService';
import {S3_ROOT_FOR_IMAGES} from '../constants/constants';
import Base from './Base';
import FaIcon from './FaIcon';

export default class PlayerControl extends Base {
	constructor(props) {
		super(props);
		this.autoBind('togglePlay', 'handleKeydown');
	}
	componentDidMount() {
		document.addEventListener('keydown', this.handleKeydown);
	}
	handleKeydown(e) {
		const key = e.keyCode || e.which;
		const isInsideInput = e.target.tagName.toLowerCase().match(/input|textarea/);
		if(isInsideInput) {
			return;
		}

		switch(true) {
			case key === 32:
				e.preventDefault();
				this.togglePlay();
				break;
			case (key === 37):
				// TODO prev track
				e.preventDefault();
				break;
			case (key === 39):
				// TODO next track
				e.preventDefault();
				break;
		}
	}
	togglePlay() {
		var sound = this.props.appState.get('sound');
		var playing = this.props.appState.get('playing');

		togglePlay(sound);
		this.context.push({
			type: 'SHALLOW_MERGE',
			data: {
				playing: !playing
			}	
		});
	}
	render() {
		var currentSet = this.props.appState.get('currentSet');
		var playing = this.props.appState.get('playing');

		if(!!playing) {
			var playButtonIcon = 'pause center';
		} else {
			var playButtonIcon = 'play center';
		}

		var image = {
			backgroundImage: `url('${S3_ROOT_FOR_IMAGES+currentSet.artistImage}')`,
			backgroundSize: '100% 100%'
		};

		return (
			<div id='PlayerControl' className='click flex-container' onMouseUp={this.togglePlay} style={image}>
				<FaIcon size={18}>{playButtonIcon}</FaIcon>
			</div>
		);
	}
}

PlayerControl.contextTypes = {
	push: PropTypes.func
};