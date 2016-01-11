import React from 'react';
import {generateSound} from '../services/playerService';

import PlayerControl from './PlayerControl';
import PlayerSeek from './PlayerSeek';
import PlayerSetInfo from './PlayerSetInfo';
import PlayerTracklist from './PlayerTracklist';
import PlayerShare from './PlayerShare';

var playingClass = 'fa center fa-pause play-button';
var pausedClass = 'fa center fa-play play-button';

const Player = React.createClass({

	contextTypes: {
		push: React.PropTypes.func
	},

	componentDidMount() {
		var sound = this.props.appState.get('sound');
		console.log(sound);

		if(sound != null) {
			this.context.push({
				type: 'SHALLOW_MERGE',
				data: {
					playerHidden: false
				}
			});
		}
	},

	componentWillReceiveProps(nextProps) {
		var appState = this.props.appState;
		var push = this.context.push;

		if(nextProps.appState.get('currentSet') != appState.get('currentSet')) {
			var starttime = nextProps.appState.get('currentSet').starttime;

			generateSound(starttime, nextProps.appState, push)
			.then(function(smObj) {
				console.log(smObj)
				//play a new set
				push({
					type: 'SHALLOW_MERGE',
					data: {
						sound: smObj,
						playing: true,
						playerHidden: false
					}
				});

				// Log Mixpanel event
				var selectedSet = nextProps.appState.get('currentSet');
				this.trackMixpanel(selectedSet);
			});
		} 
	},

	trackMixpanel(selectedSet) {
		// Log Mixpanel event
		var setName = selectedSet.artist+' - '+selectedSet.event;

		mixpanel.track("Set Play", {
			"set_id": selectedSet.id,
			"set_name": setName,
			"set_artist": selectedSet.artist,
			"set_event": selectedSet.event
		});

		// mixpanel user tracking
		mixpanel.people.increment("play_count");
		mixpanel.people.append("sets_played_ids", setProperties.set_id);
		mixpanel.people.append("sets_played_names", setProperties.set_name);
		mixpanel.people.append("sets_played_artists", setProperties.set_artist);
		mixpanel.people.append("sets_played_events", setProperties.set_event);
	},

	render() {
		var appState = this.props.appState;
		var currentSet = appState.get('currentSet');
		var hidePlayer = appState.get('playerHidden') ? 'hidden' : '';

		return (
			<div className={`flex-row ${hidePlayer}`} id='Player'>
				<PlayerControl appState={appState} />
				<div className='flex-column flex'>
					<PlayerSeek appState={appState} />
					<div className='flex flex-row'>
						<PlayerSetInfo appState={appState} />
						<PlayerTracklist appState={appState} />
						<PlayerShare appState={appState} />
					</div>
				</div>
			</div>
		);
	}
});

export default Player;