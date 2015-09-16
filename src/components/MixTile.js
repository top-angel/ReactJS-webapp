import React from 'react';
import constants from '../constants/constants';
import {History} from 'react-router';

var MixTile = React.createClass({

	mixins: [History],
	openMixPage: function() {
		var routeId = this.props.id;//quick fix for now
		this.history.pushState(null, '/mix/' + routeId);
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