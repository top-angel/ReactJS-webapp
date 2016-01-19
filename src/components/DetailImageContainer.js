import React from 'react'
import {S3_ROOT_FOR_IMAGES} from '../constants/constants'
import {playSet, updatePlayCount} from '../services/playerService'

var DetailImageContainer = React.createClass({
	contextTypes: {
		push: React.PropTypes.func,
		user: React.PropTypes.object
	},

	getDefaultProps() {
		return {
			info: null,
			imageURL: ''
		}
	},

	trackShuffleButton() {
		mixpanel.track("Shuffle Button Clicked")
	},

	shuffle() {
		var sets = this.props.sets
		var random = Math.floor(Math.random() * (sets.length - 1))
		var randomSetId = sets[random]
		
		playSet(randomSetId, this.context.push)
		updatePlayCount(randomSetId, this.context.user.id)
		this.trackShuffleButton()
	},

	render () {
		var image = {
			background: `url('${S3_ROOT_FOR_IMAGES+this.props.imageURL}') no-repeat`,
			backgroundSize: '100%',
			backgroundPositionY: '40%'
		}

		return (
			<div className='flex-column detail-header' style={image}>
				<h1 className='center'>{this.props.title}</h1>
				<h3 className='center'>{this.props.info}</h3>
				<a id='detail-button' onClick={this.shuffle}>SHUFFLE</a>
			</div>
		)
	}
	
})

export default DetailImageContainer