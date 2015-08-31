import React from 'react';
import moment from 'moment';
import constants from '../constants/constants';

var EventTile = React.createClass({
	render: function() {
		var month = moment(this.props.data.start_date).format('MMM');
    	var day = moment(this.props.data.start_date).format('DD');
		return (
			<div className="flex-column overlay-container event-tile">
			    <img className="event-image" src={constants.S3_ROOT_FOR_IMAGES+this.props.data.main_imageURL} />
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
	                <a href={this.props.data.ticket_link} className="set-flex flex click ticket-link tile-button">
	                    <i className="fa fa-fw fa-ticket center"></i>
	                </a>
	                <div className="flex-3x flex-column event-info">
	                    <div className="click center">{this.props.data.event}</div>
	                    <div className="center">{this.props.data.venue}</div>
	                </div>
	                <div className="set-flex flex click event view-trigger tile-button">
	                    <i className="fa fa-fw fa-long-arrow-right center"></i>
	                </div>
	            </div>
			</div>
		);
	}
})

module.exports = EventTile;