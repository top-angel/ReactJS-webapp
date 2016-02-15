import React, {PropTypes} from 'react';
import {updateCurrentTrack} from '../services/playerService';
import { Motion, spring, presets } from 'react-motion';
import Track from './Track';
import Base from './Base';

export default class PlayerTracklist extends Base {
	constructor(props) {
		super(props);
		this.autoBind('animate', 'updateCurrentTrack');
		this.state = {
			open: false
		};
	}
	animate() {
		this.setState({
			open: !this.state.open
		});
	}
	updateCurrentTrack() {
		updateCurrentTrack(this.props.appState, this.context.push);
	}
	render() {
		const appState = this.props.appState;

		const tracklist = appState.get('tracklist');
		const currentTrack = appState.get('currentTrack');
		const loginStatus = appState.get('isUserLoggedIn');

		let tracks = tracklist.map((track, index) => {
			//update tracklist to show current track
			const activeTrackStyle = track.trackname == currentTrack ? {
				color: '#22a7f0'
			} : {};

			return React.createElement(Track, {
				key: index,
				style: activeTrackStyle,
				trackname: track.trackname,
				starttime: track.starttime,
				appState: appState
			});
		});

		return (
			<div className='flex-row flex-5x' id='PlayerTracklist'>
				<p className='active-track flex-fixed-3x' onClick={this.animate}>
					{currentTrack}
				</p>
				<Motion style={{ yshift: spring(this.state.open ? 10 : -50, presets.gentle) }}>
					{
						({yshift}) =>
						<div className='tracklist' onMouseLeave={this.animate} style={{
							bottom: `${yshift}vh`
						}}>
							{tracks}
						</div>
					}
				</Motion>
			</div>
		);
	}
}

PlayerTracklist.propTypes = {
	push: PropTypes.func
}