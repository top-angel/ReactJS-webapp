import React from 'react';
import Sound from 'react-sound';

import constants from '../constants/constants';

import TrackContainer from './TrackContainer';
import SetContainer from './SetContainer';
import EventContainer from'./EventContainer';

import ArtistTile from './ArtistTile';

var Sandbox = React.createClass({

	getDefaultProps: function() {
		return {
			appState: {}
		};
	},
	getInitialState: function() {
		return {
			playing: true
		};
	},
	render: function() {
		var push = this.props.push;
		var appState = this.props.appState;
		var currentSet = appState.get('currentSet');
		var songURL = constants.S3_ROOT + currentSet.songURL;


		var sound = {
			url: songURL,
			playFromPosition: currentSet.starttime,//push this in tracktile
			playStatus: this.state.playing,
		};

		return (
			<div className='view'>
				<Sound {...sound} />
			</div>
		);
	}

});

module.exports = Sandbox;