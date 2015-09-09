import React from 'react';
import constants from '../constants/constants';
import moment from 'moment';
import {Navigation} from 'react-router';

var FestivalTile = React.createClass({
	
	displayName: 'FestivalTile',
	mixins: [Navigation],
	openFestivalPage: function() {
		var festivalId = this.props.id;
		var push = this.props.push;

		push({
			type: 'SHALLOW_MERGE',
			data: {
				detailId: festivalId
			}
		});

		this.transitionTo('festival');
	},
	render: function() {
		var image = {
			backgroundImage: "url('" + constants.S3_ROOT_FOR_IMAGES + 'small_' + this.props.main_imageURL + "')"
		};
		var date = moment(this.props.start_date).format('MMM DD YYYY');
		var setCount = this.props.set_count + ' sets';
		var info = setCount + ' | ' + date;
		var event = this.props.event;

		return (
			<div className='festival-tile flex-column overlay-container click'
				onClick={this.openFestivalPage} 
				style={image}>
				<div className='overlay'/>
				<div className='detail flex-column'>
					<span className='info'>{info}</span>
					<span className='festival'>{event}</span>
				</div>
			</div>
		);
	}

});

module.exports = FestivalTile;