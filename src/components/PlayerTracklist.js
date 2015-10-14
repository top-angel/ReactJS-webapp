import React from 'react';
import constants from '../constants/constants';
import playerService from '../services/playerService.js';
import {History} from 'react-router';
import { Motion, spring, presets } from 'react-motion';
import Track from './Track';

var PlayerTracklist = React.createClass({

	displayName: 'PlayerTrackInfo',
	mixins: [History],

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
		var appState = this.props.appState;
		var push = this.props.push;
		playerService.updateCurrentTrack(appState, push)
	},

	render() {
		var appState = this.props.appState;
		var push = this.props.push;
		var self = this;

		var tracklist = appState.get('tracklist');
		var currentTrack = appState.get('currentTrack');
		var loginStatus = appState.get('isUserLoggedIn');

		var tracks = tracklist.map(function(track, index) {
			//update tracklist to show current track
			if(track.trackname == currentTrack) {
				var trackStyle = 'flex track active'
			} else {
				var trackStyle = 'flex track'
			}

			var props = {
				className: trackStyle,
				key: index,
				trackname: track.trackname,
				starttime: track.starttime,
				appState: appState,
				push: push
			};

			return <Track {...props} />
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