import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {scrub} from '../services/playerService';
import {MMSSToMilliseconds, millisecondsToMMSS} from '../services/convert';

import Base from './Base';

export default class PlayerSeek extends Base {
	constructor(props) {
		super(props);
		this.autoBind('scrub', 'offsetLeft', 'bindSeekMouseEvents', 'handleSeekMouseDown', 'handleSeekMouseUp');
		this.state = {
			isSeeking: false
		};
	}
	bindSeekMouseEvents() {
		document.addEventListener('mousemove', this.scrub);
		document.addEventListener('mouseup', this.handleSeekMouseUp);
	}
	offsetLeft(el) {
		let x = el.offsetLeft;
		while(el.offsetParent) {
			x += el.offsetParent.offsetLeft;
			el = el.offsetParent;
		}
		return x;
	}
	handleSeekMouseDown(e) {
		this.bindSeekMouseEvents();
		this.setState({
			isSeeking: true
		});
	}
	handleSeekMouseUp(e) {
		if(!this.state.isSeeking) {
			return;
		}

		// remove event listeners
		document.removeEventListener('mousemove', this.scrub);
		document.removeEventListener('mouseup', this.handleSeekMouseUp);

		this.setState({
			isSeeking: false 
		});
	}
	scrub(e) {
		let push = this.context.push;
		let appState = this.props.appState;

		let seekBar = ReactDOM.findDOMNode(this.refs.scrubber);
		let offsetLeft = this.offsetLeft(seekBar);

		// le scrub 2.0
		let newPosition = ((e.clientX - offsetLeft) / (window.innerWidth - offsetLeft)) * 100;

		// console.log('clicked point x-coord', e.clientX)
		// console.log('offsetleft', offsetLeft)
		// console.log('new position', newPosition)
		scrub(newPosition, appState, push);
	}
	render() {
		let appState = this.props.appState;
		let currentSet = appState.get('currentSet');
		let timeElapsed = appState.get('timeElapsed');
		let sound = appState.get('sound');

		// use soundmanager to guess set length
		let setLength = sound.durationEstimate;
		let percent = (timeElapsed / setLength) * 100;

		
		return (
			<div id='PlayerSeek' onClick={this.scrub} ref='scrubber'>
				<div className='time-elapsed' 
					style={{ width: percent+'%' }}>
					<div className='handle'
						onClick={this.handleMouseClick}
						onMouseDown={this.handleSeekMouseDown} />
				</div>
			</div>
		);
	}
}

PlayerSeek.contextTypes = {
	push: React.PropTypes.func
};

PlayerSeek.propTypes = {
	appState: PropTypes.object
};