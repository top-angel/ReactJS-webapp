import React from 'react';
import constants from '../constants/constants';
import moment from 'moment';
import {Navigation} from 'react-router';

var FestivalTile = React.createClass({
	
	displayName: 'FestivalTile',
	mixins: [Navigation],
	openDetail: function() {
		var detailId = this.props.dataId;
		var push = this.props.push;
		console.log(dataId);

		push({
			type: 'SHALLOW_MERGE',
			data: {
				detailId: dataId
			}
		});

		this.transitionTo('festival');
	},
	render: function() {
		var image = {
			backgroundImage: "url('" + constants.S3_ROOT_FOR_IMAGES + 'small_' + this.props.data.main_imageURL + "')"
		};
		var date = moment(this.props.data.start_date).format('MMM DD YYYY');
		var setCount = this.props.data.set_count + ' sets';
		var info = setCount + ' | ' + date;
		var event = this.props.data.event;

		return (
			<div className='festival-tile flex-column overlay-container click'
				onClick={this.openDetail} 
				style={image}
				dataId={this.props.dataId}>
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