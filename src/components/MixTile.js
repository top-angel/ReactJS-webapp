import React from 'react';
import constants from '../constants/constants';
import {Navigation} from 'react-router';

var MixTile = React.createClass({

	mixins: [Navigation],
	openMixPage: function() {
		var dataId = this.props.dataId;
		console.log(dataId);

		var push = this.props.push;
		console.log(dataId);

		push({
			type: 'SHALLOW_MERGE',
			data: {
				detailId: dataId
			}
		});

		this.transitionTo('mix');
	},
	render: function() {
		var image = constants.S3_ROOT_FOR_IMAGES + 'small_' + this.props.data.imageURL;
		var setCount = this.props.data.set_count + ' sets';
		var event = this.props.data.event;
		return (
			<div className='mix-tile flex-column overlay-container click' dataId={this.props.dataId} onClick={this.openMixPage}>
				<img src={constants.S3_ROOT_FOR_IMAGES + 'small_' + this.props.data.imageURL}/>
				<span className='mix center'>{event}</span>
			</div>
		);
	}

});

module.exports = MixTile;