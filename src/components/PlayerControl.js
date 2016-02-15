import React, {PropTypes} from 'react';
import {togglePlay} from '../services/playerService';
import {S3_ROOT_FOR_IMAGES} from '../constants/constants';
import Base from './Base';
import Icon from './FaIcon';

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
		const sound = this.props.appState.get('sound');
		let playing = this.props.appState.get('playing');
		this.context.push({ playing: !playing });
		togglePlay(sound);
	}
	render() {
		const currentSet = this.props.appState.get('currentSet');
		const playing = this.props.appState.get('playing');
		let playerIcon = playing ? 'pause' : 'play';

		let image = {
			backgroundImage: `url('${S3_ROOT_FOR_IMAGES+currentSet.artistImage}')`,
			backgroundSize: '100% 100%'
		};

		return (
			<div id='PlayerControl' onMouseUp={this.togglePlay} style={image}>
				<Icon size={18}>{playerIcon}</Icon>
			</div>
		);
	}
}

PlayerControl.contextTypes = {
	push: PropTypes.func
};