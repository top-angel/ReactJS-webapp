import React, {PropTypes} from 'react'
import {generateSound, mixpanelTrackSetPlay} from '../services/playerService'

import Base from './Base'
import PlayerControl from './PlayerControl'
import PlayerSeek from './PlayerSeek'
import PlayerSetInfo from './PlayerSetInfo'
import PlayerTracklist from './PlayerTracklist'
import PlayerShare from './PlayerShare'
import SetShare from './SetShare'

let playingClass = 'fa center fa-pause play-button'
let pausedClass = 'fa center fa-play play-button'

class Player extends Base {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		// TODO move hide player toggle to appState maybe
		let sound = this.props.appState.get('sound')
		if(sound.durationEstimate != 0) {
			this.context.push({ playerHidden: false })
		}
	}
	componentWillReceiveProps(nextProps) {
		let appState = this.props.appState

		if(nextProps.appState.get('currentSet') != appState.get('currentSet')) {
			let starttime = nextProps.appState.get('currentSet').starttime

			generateSound(starttime, nextProps.appState, push).then(function(smObj) {
				//play a new set
				this.context.push({
					sound: smObj,
					playing: true,
					playerHidden: false
				})


				// Log Mixpanel event
				let selectedSet = nextProps.appState.get('currentSet')
				mixpanelTrackSetPlay(selectedSet)
			})
		} 
	}
	render() {
		let appState = this.props.appState
		let currentSet = appState.get('currentSet')
		let hidePlayer = appState.get('playerHidden') ? 'hidden' : ''

		return (
			<div id='Player' className={`flex-row ${hidePlayer}`}>
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