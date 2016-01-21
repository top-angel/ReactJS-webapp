import React from 'react'
import BaseComponent from './BaseComponent'
import CssModules from 'react-css-modules'
import styles from '../../public/css/TrackTile.css'

import { S3_ROOT_FOR_IMAGES } from '../constants/constants'
import { playSet, updatePlayCount } from '../services/playerService'
import history from '../services/history'

class TrackTile extends BaseComponent {
	constructor(props) {
		super(props)
		this.autoBind('openArtistPage', 'openFestivalPage', 'playSet', 'trackPlay')
	}
	openArtistPage() {
		var routePath = this.props.artist.split(' ').join('_')
		history.pushState(null, `/artist/${routePath}`)
		mixpanel.track("Artist Clicked", {
			"Artist": this.props.artist
		})
	}
	openFestivalPage() {
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
			<div className='track-tile flex-column click' style={image} onClick={this.playSet} >
			    <div className='flex-row track'>
			    	<img src={S3_ROOT_FOR_IMAGES+this.props.artist_image} />
			    	<p className='text'>
				    	{this.props.trackname}
				    	<br/>
				    	{time}
			    	</p>
			    </div>
			    <i className='fa fa-play'/>
			    <div className='set flex-column'>
					<span className='artist' onClick={this.openArtistPage}>{this.props.artist}</span>
					<span className='event' onClick={this.openFestivalPage}>{this.props.event}</span>
				</div>
			</div>
		)
	}
}

TrackTile.contextTypes = {
	push: React.PropTypes.func,
	user: React.PropTypes.object
}

export default CssModules(TrackTile, styles)
