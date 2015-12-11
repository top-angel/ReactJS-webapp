import React, {Component} from 'react'
import {S3_ROOT_FOR_IMAGES} from '../constants/constants'

var container = {
	position: 'relative'
}

export default class EventDetailHeader extends React.Component {
	constructor(props) {
		super(props)
		this.openTicketLink = this.openTicketLink.bind(this)
	}
	openTicketLink() {
		window.open(this.props.ticketLink)
	}
	render() {
		var image = {
			background: `url('${S3_ROOT_FOR_IMAGES+this.props.imageURL}')`
		}
		
		return (
			<div className='detail-header flex-column' style={image}>
				<h1 className='center'>{this.props.title}</h1>
				<h3 className='center'>{this.props.date}</h3>
				<a id='detail-button'>TICKETS</a>
			</div>
		)
	}
}

EventDetailHeader.defaultProps = {
	imageURL: ''
}
