import React from 'react'
import BaseComponent from './BaseComponent'
import CssModules from 'react-css-modules'
import styles from '../../public/css/SetTile.css'

import { API_ROOT, S3_ROOT_FOR_IMAGES, DEFAULT_IMAGE } from '../constants/constants'
import history from '../services/history'
import {playSet, updatePlayCount} from '../services/playerService'

import SetShare from './SetShare'

class SetTile extends BaseComponent {
	constructor(props) {
		super(props)
		this.autoBind('openArtistPage', 'openFestivalPage', 'playSet')
	}
	openArtistPage() {
		var routePath = this.props.artist.split(' ').join('_')
		history.pushState(null, `/artist/${routePath}`)
		mixpanel.track("Artist Clicked", {
			"Artist": this.props.artist
		})
	}
	openFestivalPage() {
		if(this.props.isRadiomix) {
			history.pushState(null, `/mix/${this.props.eventId}`)
		} else {
			history.pushState(null, `/festival/${this.props.eventId}`)
		}
	}
	playSet() {	
		playSet(this.props.id, this.context.push)
		updatePlayCount(this.props.id, this.context.user.id)
	}
	render() {
		var eventImage = {
			backgroundImage: `url(${S3_ROOT_FOR_IMAGES+this.props.bannerImage})`
		}

		return (
			<div styleName='set-tile' style={eventImage} className='flex-column'>
				<div  styleName='detail' className='flex-column'>
					<div className='flex-row flex-fixed-2x'>
						<img src={S3_ROOT_FOR_IMAGES+this.props.artistImage} onClick={this.openArtistPage} />
						<div className='flex-column flex' styleName='set'>
							<div className='flex click' onClick={this.openFestivalPage}>{this.props.setName}</div>
							<div styleName='artist' className='flex click' onClick={this.openArtistPage}>{this.props.artist}</div>
							<SetShare 
								id={this.props.id} 
								favorited={this.props.favorited} />
						</div>
					</div>
					<div styleName='horizontal-divider'/>
					<div className='flex-row flex-fixed'>
						<div styleName='play' className='flex-fixed flex-container'
							onClick={this.playSet}>
							<i className='fa fa-play center'>{'  '+this.props.popularity}</i>
						</div>
						<div styleName='vertical-divider'/>
						<div className='flex-fixed flex-container'>
							<i className='fa fa-clock-o center'>{'  '+this.props.setLength}</i>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

SetTile.contextTypes = {
	push: React.PropTypes.func,
	user: React.PropTypes.object,
	loginStatus: React.PropTypes.bool
}

SetTile.defaultProps = {
	favorited: false,
	artistImage: DEFAULT_IMAGE
}

export default CssModules(SetTile, styles)