import React, {Component} from 'react'
import {S3_ROOT_FOR_IMAGES, DEFAULT_IMAGE} from '../constants/constants'

export default class EventDetailHeader extends Component {
	constructor(props) {
		super(props)
		this.openTicketLink = this.openTicketLink.bind(this)
	}
	openTicketLink() {
		window.open(this.props.ticketLink)
	}
	render() {
		var image = {
			background: `url('${S3_ROOT_FOR_IMAGES+this.props.imageURL}') no-repeat`,
			backgroundSize: '100%',
			backgroundPositionY: '40%'
		}
		
		return (
			<div className='detail-header flex-column' style={image}>
				<h1 className='center'>{this.props.title}</h1>
				<h3 className='center'>{this.props.date}</h3>
				<a id='detail-button' target='_blank' href={this.props.ticketLink}>TICKETS</a>
			</div>
		)
	}
}

EventDetailHeader.defaultProps = {
	imageURL: DEFAULT_IMAGE
}