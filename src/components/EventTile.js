import React, {PropTypes} from 'react';
import moment from 'moment';
import {S3_ROOT_FOR_IMAGES} from '../constants/constants';
import history from '../services/history';
import Base from './Base';
import Icon from './FaIcon';

function addressParser(address) {
	let cityAndState
}

export default class EventTile extends Base {
	constructor(props) {
		super(props);
		this.autoBind('openEventPage', 'openTicketLink', 'openMapLink');
	}
	openEventPage(e) {
		e.stopPropagation();
		history.pushState(null, '/event/' + this.props.id);
	}
	openMapLink(e) {
		e.stopPropagation();
		// TODO nofity to open in google maps
		window.open(`http://google.com/maps/place/${this.props.address}`);
	}
	openTicketLink() {
		window.open(this.props.ticketLink);
	}
	render() {
		let month = moment(this.props.startDate).format('MMM');
    	let day = moment(this.props.startDate).format('DD');
		let image = {
			backgroundImage: `url('${S3_ROOT_FOR_IMAGES+this.props.bannerImage}')`
		};

		return (
			<div className='event-tile flex-column' style={image}>
				<div className='body flex-column flex'>
					<div className='event-info flex-column flex'>
						<div className='event'>
							<div className='date'>
								<h4>{day}</h4>
								<p className='caption'>{month}</p>
							</div>
							<h5 onClick={this.openEventPage}>{this.props.event}</h5>
						</div>
						<div className='flex-row'>
							<Icon>map-marker</Icon>
							<p className='venue' onClick={this.openMapLink}>{this.props.venue}</p>
						</div>
					</div>
					<button onClick={this.openTicketLink}>TICKETS</button>
				</div>
			</div>
		);
	}
}

EventTile.contextTypes = {
	push: PropTypes.func
};

EventTile.propTypes = {
	id: PropTypes.number,
	event: PropTypes.string,
	startDate: PropTypes.string,
	bannerImage: PropTypes.string,
	ticketLink: PropTypes.string,
	venue: PropTypes.string,
	address: PropTypes.string
};