import React, {PropTypes} from 'react';
import {changeTrack} from '../services/playerService';
import {MMSSToMilliseconds} from '../services/convert';
import Base from './Base';

export default class Track extends Base {
	constructor(props) {
		super(props);
		this.autoBind('changeTrack');
	}
	changeTrack() {
		let {appState, trackname, starttime} = this.props;
		starttime = MMSSToMilliseconds(starttime);
		changeTrack(appState, this.context.push, starttime, trackname);
	}
	render() {
		const {trackname, starttime, style} = this.props;

		return (
			<p className='track' onClick={this.changeTrack} style={style}>
				<span className='starttime'>{starttime}</span>
				<span className='trackname'>{trackname}</span>
			</p>
		);
	}
}

Track.contextTypes = {
	push: PropTypes.func
};

Track.propTypes = {
	starttime: PropTypes.string,
	style: PropTypes.object
};