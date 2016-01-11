import React from 'react';
import constants from '../constants/constants';
import {updateCurrentTrack} from '../services/playerService.js';
import { Motion, spring, presets } from 'react-motion';
import Track from './Track';

var PlayerTracklist = React.createClass({

	contextTypes: {
		push: React.PropTypes.func
	},

	getInitialState() {
		return {
			open: false
		};
	},

	animate() {
		this.setState({
			open: !this.state.open
		});
	},

	updateCurrentTrack() {
		updateCurrentTrack(this.props.appState, this.context.push)
	},

	render() {
		var appState = this.props.appState;
		var self = this;

		var tracklist = appState.get('tracklist');
		var currentTrack = appState.get('currentTrack');
		var loginStatus = appState.get('isUserLoggedIn');

		var tracks = tracklist.map((track, index) => {
			//update tracklist to show current track
			var trackStyle = track.trackname == currentTrack ? 'flex track active' : 'flex track'

			return React.createElement(Track, {
				className: trackStyle,
				key: index,
				trackname: track.trackname,
				starttime: track.starttime,
				appState: appState
			})
		});

		return (
			<div className='flex-row flex-5x' id='PlayerTracklist'>
				<div className='active-track center flex-fixed-3x' onClick={this.animate}>
					{currentTrack}
				</div>
				<Motion style={{
					yshift: spring(this.state.open ? 10 : -50, presets.gentle)
				}}>
					{
						({yshift, opacity}) =>
						<div className='tracklist' onMouseLeave={() => {self.animate()}}style={{
							bottom: `${yshift}vh`
						}}>
							{tracks}
						</div>
					}
				</Motion>
				<div className='flex-container flex click hidden' id='open-tracklist'>
					<i className='fa fa-fw center fa-bars'/>
				</div>
			</div>
		);
	}

});

module.exports = PlayerTracklist;