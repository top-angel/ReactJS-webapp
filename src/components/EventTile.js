import React from 'react';
import moment from 'moment';
import {History} from 'react-router';
import constants from '../constants/constants';

var EventTile = React.createClass({

	displayName: 'EventTile',
	mixins: [History],

	openEventPage: function() {
		var routePath = this.props.id;
		this.history.pushState(null, '/event/' + routePath);
	},

	render: function() {
		var month = moment(this.props.start_date).format('MMM');
    	var day = moment(this.props.start_date).format('DD');
		var image = {
			backgroundImage: "url('" + constants.S3_ROOT_FOR_IMAGES+this.props.main_imageURL + "')"
		};

		return (
			<div className='flex-column event-tile' style={image}>
				<div className='event-date-container flex-5x flex-column click' onClick={this.openEventPage} >
					<h2>{month}</h2>
					<div className='divider'/>
					<h2>{day}</h2>
				</div>
				<div className='divider'/>
				<div className='detail flex-row flex'>
					<a href={this.props.ticket_link} className='flex-container flex click ticket-link tile-button'>
						<i className='fa fa-fw fa-ticket center'/>
					</a>
					<div className='flex-3x flex-column event-info'>
						<div className='center'>{this.props.event}</div>
						<div className='center venue'>{this.props.venue}</div>
					</div>
					<div className='flex-container flex click event tile-button' onClick={this.openEventPage}>
						<i className='fa fa-fw fa-long-arrow-right center'/>
					</div>
				</div>
			</div>
		);
	}
})

module.exports = EventTile;