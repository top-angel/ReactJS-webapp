import React, {PropTypes} from 'react'
import {changeTrack} from '../services/playerService'
import {MMSSToMilliseconds} from '../services/convert'
import Base from './Base'

export default class Track extends Base {
	constructor(props) {
		super(props)
		this.autoBind('changeTrack')
	}
	changeTrack() {
		var {appState, trackname, starttime, className} = this.props
		var starttime = MMSSToMilliseconds(starttime)
		changeTrack(appState, this.context.push, starttime, trackname)
	}
	render() {
		var {trackname, starttime, className} = this.props

		return (
			<div className={className} onClick={this.changeTrack} >
				<span className='starttime'>{starttime}</span>
				<span className='trackname'>{trackname}</span>
			</div>
		)
	}
}

Track.contextTypes = {
	push: PropTypes.func
}

Track.defaultProps = {
	className: 'track flex',
	starttime: 0,
}