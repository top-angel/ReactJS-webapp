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

		// return (
		// 	<div className='flex-column overlay-container event-tile'>
		// 	    <img className='event-image' src={constants.S3_ROOT_FOR_IMAGES+this.props.main_imageURL} />
		// 	    <div className='overlay'/>
		// 	    <div className='event-date-container flex-5x flex-column'>
		// 	        <div className='month'>
		// 		        {month}
		// 	        </div>
		// 	        <div className='divider'/>
		// 	        <div className='day'>
		// 		        {day}
		// 	        </div>
		// 	    </div>
		// 	    <div className='divider'></div>
		// 	    <div className='tile-controls flex-row flex'>
	 //                <a href={this.props.ticket_link} className='set-flex flex click ticket-link tile-button'>
	 //                    <i className='fa fa-fw fa-ticket center'/>
	 //                </a>
	 //                <div className='flex-3x flex-column event-info'>
	 //                    <div className='click center' onClick={this.openEventPage}>
		//                     {this.props.event}
	 //                    </div>
	 //                    <div className='center'>{this.props.venue}</div>
	 //                </div>
	 //                <div className='set-flex flex click event view-trigger tile-button' onClick={this.openEventPage}>
	 //                    <i className='fa fa-fw fa-long-arrow-right center'/>
	 //                </div>
	 //            </div>
		// 	</div>
		// );
	var image = {
		backgroundImage: "url('" + constants.S3_ROOT_FOR_IMAGES+this.props.main_imageURL + "')"
	};

	return (
		<div className='flex-column overlay-container event-tile' style={image}>

		    <div className='event-date-container flex-5x flex-column click' onClick={this.openEventPage} >
				<div>{month}</div>
				<div className='divider'/>
				<div>{day}</div>
		    </div>

		    <div className='divider'/>

		    <div className='detail flex-row flex'>
                <a href={this.props.ticket_link} className='set-flex flex click ticket-link tile-button'>
                    <i className='fa fa-fw fa-ticket center'/>
                </a>
                <div className='flex-3x flex-column event-info'>
                    <div className='center'>
	                    {this.props.event}
                    </div>
                    <div className='center'>
	                    {this.props.venue}
                    </div>
                </div>
                <div className='set-flex flex click event view-trigger tile-button' onClick={this.openEventPage}>
                    <i className='fa fa-fw fa-long-arrow-right center'/>
                </div>
	          </div>

			</div>
		);
	}
})

module.exports = EventTile;