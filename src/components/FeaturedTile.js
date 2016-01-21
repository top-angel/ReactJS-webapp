import React from 'react'
import {S3_ROOT_FOR_IMAGES} from '../constants/constants'
import {Motion, spring, presets} from 'react-motion'
import history from '../services/history'

var FeaturedTile = React.createClass({
	
	openDetailPage() {
		history.pushState(null, `/festival/${this.props.id}`)
		this.trackClick()
	},

	trackClick() {
		mixpanel.track('Featured Event Clicked', {
			'event': this.props.event
		})
	},

	render() {
		var image = {
			backgroundImage: `url(${S3_ROOT_FOR_IMAGES + this.props.banner_image})`
		}

		return (
			<div className='featured-tile flex-column overlay-container click' 
				style={image} 
				onClick={this.openDetailPage} >
				<div className='featured-info flex-column animated'>
					<h3 style={{margin: 0}}>{this.props.event}</h3>
					{this.props.formattedDate}
					{`${this.props.set_count} sets`}
				</div>
			</div>
		)
	}
})

export default FeaturedTile