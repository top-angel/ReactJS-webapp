import React from 'react';
import constants from '../constants/constants';
import playerService from '../services/playerService.js';
import {History} from 'react-router';

import Track from './Track';

var PlayerTracklist = React.createClass({

	displayName: 'PlayerTrackInfo',
	mixins: [History],

	componentDidMount: function() {
		$('#PlayerTracklist').click(function() {
			if($('.tracklist').hasClass('tracklist-open')) {
				$('.tracklist').removeClass('tracklist-open')
					.animate({
						bottom: '-50vh',
						opacity: 0
					}, 200);
			} else {
				$('.tracklist').addClass('tracklist-open')
					.animate({
						bottom: '10vh',
						opacity: 1
					}, 200);
			}
		});

		//HIDE TRACKLIST WHEN CLICKING OFFF
		// $('.tracklist > *').click(function(e) {
		// 	e.stopPropagation();
		// });

		// $(window).not($('.tracklist')).click(function() {
		// 	// if($('.tracklist').hasClass('tracklist-open')) {
		// 		$('.tracklist').removeClass('tracklist-open')
		// 			.animate({
		// 				bottom: '-50vh',
		// 				opacity: 0
		// 			}, 200);
		// 	// }
		// });

		//hide tracklist by pressing escape
		// $(document.body).keypress(function(e) {
		// 	console.log(e.charCode);
		// });
	},

	updateCurrentTrack: function() {
		var appState = this.props.appState;
		var push = this.props.push;
		playerService.updateCurrentTrack(appState, push)
	},

	render: function() {
		var appState = this.props.appState;
		var push = this.props.push;
		var _this = this;

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
				<div className='active-track center flex-fixed-3x'>
					{currentTrack}
				</div>
				<div className='tracklist'>
					{tracks}
				</div>
				<div className='flex-container flex click' id='open-tracklist'>
					<i className='fa fa-fw center fa-bars'/>
				</div>
			</div>
		);
	}

});

module.exports = PlayerTracklist;