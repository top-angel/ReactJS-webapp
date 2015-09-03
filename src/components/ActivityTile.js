import React from 'react';
import constants from '../constants/constants';
import {Navigation} from 'react-router';

var ActivityTile = React.createClass({

	displayName: 'ActivityTile',
	mixins: [Navigation],
	openDetail: function() {
		var detailId = this.props.data.id;
		var push = this.props.push;

		push({
			type: 'SHALLOW_MERGE',
			data: {
				detailId: detailId
			}
		});

		this.transitionTo('activity');
	},
	render: function() {
		var image = {
			backgroundImage: "url('" + constants.S3_ROOT_FOR_IMAGES + 'small_' + this.props.data.imageURL + "')"
		};
		var setCount = this.props.data.set_ids.length + ' sets';
		var event = this.props.data.activity;

		return (
			<div className='activity-tile flex-column overlay-container click' style={image} onClick={this.openDetail}>
				<span className='activity'>{event}</span>
				<div className='info flex-row overlay-container'>
					<img src={constants.S3_ROOT_FOR_IMAGES + 'small_' + this.props.data.imageURL}/>
					<span className='center flex'>{setCount}</span>
				</div>
			</div>
		);
	}

});

module.exports = ActivityTile;