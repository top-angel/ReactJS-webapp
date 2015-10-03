import React from 'react';
import R from 'ramda';
import constants from '../constants/constants';
import {History} from 'react-router';

import LandingHome from './LandingHome';
import LandingApp from './LandingApp';
import LandingBeacon from './LandingBeacon';
import Footer from './Footer';

var LandingView = React.createClass({

	displayName: 'Home Page',
	mixins: [History],

	componentWillMount() {
		var push = this.props.push;
		var id = this.props.params.set;
		var self = this;

		if(!!id) {
			this.getSetById(id)
				.done(function(res) {
					var set = R.head(res.payload.set);
					var currentSet = {
						artist: set.artist,
						event: set.event,
						id: set.id,
						set_length: set.set_length,
						songURL: set.songURL,
						artistimageURL: set.artistimageURL,
						starttime: '00:00'
					};

					self.getTracklist(id)
					.done(function(res) {
						console.log(res.payload.tracks);
						var tracklist = res.payload.tracks;

						push({
							type: 'SHALLOW_MERGE',
							data: {
								currentSet: currentSet,
								tracklist: tracklist,
								currentTrack: R.head(res.payload.tracklist),
								playing: true
							}
						});
					});
			});
		}
	},

	getSetById(id) {
		return (
			$.ajax({
				type: 'get',
				url: constants.API_ROOT + 'set/id',
				data: {
					'setId': [id]
				}
			})
		);
	},

	getTracklist(id) {
		return (
			$.ajax({
				url: constants.API_ROOT + 'tracklist/' + id,
				type: 'get'
			})
		);
	},

	render() {
		var playerHidden = this.props.appState.get('playerHidden');
		if(playerHidden) {
			var hidePlayer = true;
		} else {
			var hidePlayer = false;
		}

		return (
			<div id='LandingView' className='flex-column view'>
				<LandingHome hidePlayer={hidePlayer} />
				<LandingApp hidePlayer={hidePlayer} />
				<LandingBeacon hidePlayer={hidePlayer} />
				<Footer />
			</div>
		);
	}

});

module.exports = LandingView;
