import React from 'react';
import moment from 'moment';
import {Navigation} from 'react-router';
import constants from '../constants/constants';

var EventTile = React.createClass({

	displayName: 'EventTile',
	mixins: [Navigation],
	openEventPage: function() {
		var push = this.props.push;
		var eventId = this.props.id;
		console.log(eventId);

		push({
			type: 'SHALLOW_MERGE',
			data: {
				detailId: eventId
			}
		});

		this.transitionTo('event');
	},
	render: function() {
		var month = moment(this.props.start_date).format('MMM');
    	var day = moment(this.props.start_date).format('DD');

		return (
			<div className="flex-column overlay-container event-tile">
			    <img className="event-image" src={constants.S3_ROOT_FOR_IMAGES+this.props.main_imageURL} />
			    <div className="overlay"></div>
			    <div className="event-date-container flex-5x flex-column">
			        <div className="month">
				        {month}
			        </div>
			        <div className="divider"></div>
			        <div className="day">
				        {day}
			        </div>
			    </div>
			    <div className="divider"></div>
			    <div className="tile-controls flex-row flex">
	                <a href={this.props.ticket_link} className="set-flex flex click ticket-link tile-button">
	                    <i className="fa fa-fw fa-ticket center"></i>
	                </a>
	                <div className="flex-3x flex-column event-info">
	                    <div className="click center">{this.props.event}</div>
	                    <div className="center">{this.props.venue}</div>
	                </div>
	                <div className="set-flex flex click event view-trigger tile-button" onClick={this.openEventPage}>
	                    <i className="fa fa-fw fa-long-arrow-right center"></i>
	                </div>
	            </div>
			</div>
		);
	}
})

module.exports = EventTile;