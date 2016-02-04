import React from 'react'
import Base from './Base'

import { S3_ROOT_FOR_IMAGES } from '../constants/constants'
import { playSet, updatePlayCount } from '../services/playerService'
import history from '../services/history'

export default class TrackTile extends Base {
	constructor(props) {
		super(props)
		this.autoBind('openArtistPage', 'openFestivalPage', 'playSet', 'trackPlay')
	}
	openArtistPage(e) {
		e.stopPropagation()
		var routePath = this.props.artist.split(' ').join('_')
		history.pushState(null, `/artist/${routePath}`)
		mixpanel.track("Artist Clicked", {
			"Artist": this.props.artist
		})
	}
	openFestivalPage(e) {
		e.stopPropagation()
		if(this.props.is_radiomix == 0) {
			history.pushState(null, `/festival/${this.props.id}`)
		} else {
			history.pushState(null, `/mix/${this.props.id}`)
		}
	}
	playSet() {
		playSet(this.props.id, this.context.push, this.props.starttime)
		updatePlayCount(this.props.id, this.context.user.id)
		this.trackPlay()
	}
	trackPlay() {
		mixpanel.track("Track Played", {
			"Track Artist": this.props.artist_name,
			"Track Name": this.props.track_name,
			"Set Artist": this.props.artist,
			"Event": this.props.event
		})
	}
	render() {
		var image = {
			backgroundImage: `url('${S3_ROOT_FOR_IMAGES+this.props.banner_image}')`,
			backgroundSize: '100% 100%'
		}
		var time = `${this.props.starttime} | ${this.props.set_length}`

		return (
			<div styleName='track-tile' className='flex-column' style={image} onClick={this.playSet} >
			    <div styleName='track' className='flex-row'>
			    	<img src={S3_ROOT_FOR_IMAGES+this.props.artist_image} />
			    	<p>
				    	{this.props.trackname}
				    	<br/>
				    	{time}
			    	</p>
			    </div>
			    <i styleName='play' className='fa fa-play'/>
			    <div styleName='set' className='flex-column'>
					<span styleName='artist' onClick={this.openArtistPage}>{this.props.artist}</span>
					<span styleName='event' onClick={this.openFestivalPage}>{this.props.event}</span>
				</div>
			</div>
		)
	}
}

TrackTile.contextTypes = {
	push: React.PropTypes.func,
	user: React.PropTypes.object
}