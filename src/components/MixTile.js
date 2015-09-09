import React from 'react';
import constants from '../constants/constants';
import {Navigation} from 'react-router';

var MixTile = React.createClass({

	mixins: [Navigation],
	openMixPage: function() {
		var mixId = this.props.id;
		console.log(mixId);

		var push = this.props.push;
		console.log(mixId);

		push({
			type: 'SHALLOW_MERGE',
			data: {
				detailId: mixId
			}
		});

		this.transitionTo('mix');
	},
	render: function() {
		var image = constants.S3_ROOT_FOR_IMAGES + 'small_' + this.props.imageURL;

		return (
			<div className='mix-tile flex-column overlay-container click'onClick={this.openMixPage}>
				<img src={constants.S3_ROOT_FOR_IMAGES + 'small_' + this.props.imageURL}/>
				<span className='mix center'>{this.props.event}</span>
			</div>
		);
	}

});

module.exports = MixTile;