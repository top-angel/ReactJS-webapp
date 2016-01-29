import React, {PropTypes} from 'react'
import CssModules from 'react-css-modules'
import {generateSound, mixpanelTrackSetPlay} from '../services/playerService'

import BaseComponent from './BaseComponent'
import PlayerControl from './PlayerControl'
import PlayerSeek from './PlayerSeek'
import PlayerSetInfo from './PlayerSetInfo'
import PlayerTracklist from './PlayerTracklist'
import PlayerShare from './PlayerShare'

var playingClass = 'fa center fa-pause play-button'
var pausedClass = 'fa center fa-play play-button'

class Player extends BaseComponent {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		// TODO move hide player toggle to appState maybe
		var sound = this.props.appState.get('sound')
		if(sound != null) {
			this.context.push({
				type: 'SHALLOW_MERGE',
				data: {
					playerHidden: false
				}
			})
		}
	}
	componentWillReceiveProps(nextProps) {
		var appState = this.props.appState
		var push = this.context.push

		if(nextProps.appState.get('currentSet') != appState.get('currentSet')) {
			var starttime = nextProps.appState.get('currentSet').starttime

			generateSound(starttime, nextProps.appState, push).then(function(smObj) {
				//play a new set
				push({
					type: 'SHALLOW_MERGE',
					data: {
						sound: smObj,
						playing: true,
						playerHidden: false
					}
				})

				// Log Mixpanel event
				var selectedSet = nextProps.appState.get('currentSet')
				mixpanelTrackSetPlay(selectedSet)
			})
		} 
	}
	render() {
		var appState = this.props.appState
		var currentSet = appState.get('currentSet')
		var hidePlayer = appState.get('playerHidden') ? 'hidden' : ''

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
		)
	}
}

Player.contextTypes = {
	push: PropTypes.func
}

Player.propTypes = {

}

export default Player