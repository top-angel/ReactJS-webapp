import React from 'react';
import {S3_ROOT_FOR_IMAGES} from '../constants/constants';
import history from '../services/history';

var MixTile = React.createClass({

	openMixPage() {
		history.pushState(null, '/mix/' + this.props.id);
	},

	render() {
		return (
			<div className='mix-tile flex-column click'onClick={this.openMixPage}>
				<img src={S3_ROOT_FOR_IMAGES + this.props.icon_image}/>
				<span className='mix center'>{this.props.event}</span>
			</div>
		);
	}

});

module.exports = MixTile;