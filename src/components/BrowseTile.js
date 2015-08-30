import React from 'react';
import GlobalEventHandler from '../services/globalEventHandler';
import constants from '../constants/constants';
import {Navigation} from 'react-router';

var BrowseTile = React.createClass({
	displayName: 'BrowseTile',
	mixins: [Navigation],
	openDetail: function() {
		var dataId = this.props.dataId;
		var push = this.props.push;
		console.log(dataId);
		push({
			type: 'SHALLOW_MERGE',
			data: {
				detailId: dataId
			}
		});

		//TODO make this work for all other components
		this.transitionTo('activity');
	},
	render: function() {
		return (
			<div 
				className="browse-tile flex-column overlay-container click view-trigger" 
				onClick={this.openDetail}
				dataId={this.props.id}>
				<div className="overlay set-flex">
					<div className="browse-name center">{this.props.text}</div>
				</div>
				<img className="browse-tile-image" src={constants.S3_ROOT_FOR_IMAGES + 'small_'+this.props.image} />
			</div>
		);
	}
});

module.exports = BrowseTile;
