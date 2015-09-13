import React from 'react';
import convert from '../services/convert';
import constants from '../constants/constants';
import playerService from '../services/playerService.js';

import Track from './Track';

var PlayerTracklist = React.createClass({

	displayName: 'PlayerTrackInfo',

		componentDidMount: function() {
			$('#open-tracklist').click(function() {
				if($('.tracklist').hasClass('tracklist-open')) {
					$('.tracklist').removeClass('tracklist-open')
						.animate({ bottom: '-50vh'}, 200);
				} else {
					$('.tracklist').addClass('tracklist-open')
						.animate({ bottom: '10vh' }, 200);
				}
			});
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

			var tracks = tracklist.map(function(track, index) {
				var props = {
					key: index,
					trackname: track.trackname,
					starttime: track.starttime,
					appState: appState,
					push: push
				};

				return <Track {...props} />
			});

			return (
				<div className='flex-row flex-fixed' id='PlayerTracklist'>
					<div className='active-track center flex-fixed-3x'>{currentTrack}</div>
					<div className='tracklist'>
						{tracks}
					</div>
					<div className='flex-row flex-fixed'>
						<div className='set-flex flex click' id='open-tracklist'>
							<i className='fa fa-fw center fa-bars'/>
						</div>
						<div className='set-flex flex click' 
						onClick={this.updateCurrentTrack}>					
							<i className='fa fa-fw center fa-star-o'/>
						</div>
						<div className='set-flex flex click'>
							<i className='fa fa-fw center fa-share'/>
						</div>
					</div>
				</div>
			);
		}

});

module.exports = PlayerTracklist;