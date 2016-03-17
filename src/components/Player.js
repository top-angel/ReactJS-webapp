import React, {PropTypes} from 'react';
import {generateSound} from '../services/playerService';
import {trackSetPlay} from '../services/mixpanelService';
import {checkIfFavorited} from '../services/favoriteSet';

import Base from './Base';
import PlayerControl from './PlayerControl';
import PlayerSeek from './PlayerSeek';
import PlayerSetInfo from './PlayerSetInfo';
import PlayerTracklist from './PlayerTracklist';
import SetShare from './SetShare';

export default class Player extends Base {
	constructor(props) {
		super(props);
		this.autoBind('checkIfFavorited', 'playSet');
	}
	componentDidMount() {
		this.playSet(this.props.appState);
	}
	componentWillReceiveProps(nextProps) {
		const appState = this.props.appState;
		if(nextProps.appState.get('currentSet') != appState.get('currentSet')) {
			this.playSet(nextProps.appState);
		} 
	}
	playSet(appState) {
		generateSound(appState, this.context.push).then(smObj => {
			this.context.push({
				sound: smObj,
				playing: true,
				playerHidden: false
			});

			// Log Mixpanel event
			trackSetPlay(appState.get('currentSet'));
		})
	}
	checkIfFavorited(setId) {
		return this.context.loginStatus ? checkIfFavorited(setId, this.context.favoriteSetIds) : false;
	}
	render() {
		let appState = this.props.appState;
		let currentSet = appState.get('currentSet');
		let favorited = this.checkIfFavorited(currentSet.id);

		return (
			<div id='Player' className='flex-row-nowrap'>
				<PlayerControl appState={appState} />
				<div className='flex-column flex'>
					<PlayerSeek appState={appState} />
					<div className='flex flex-row'>
						<PlayerSetInfo appState={appState} />
						<PlayerTracklist appState={appState} />
						<SetShare id={currentSet.id} artistImage={currentSet.artistImage} favorited={favorited} />
					</div>
				</div>
			</div>
		);
	}
}

Player.contextTypes = {
	push: PropTypes.func,
	loginStatus: PropTypes.bool,
	favoriteSetIds: PropTypes.array
};

Player.propTypes = {

};