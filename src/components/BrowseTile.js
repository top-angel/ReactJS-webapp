import React from 'react';
import GlobalEventHandler from '../services/globalEventHandler';
import constants from '../constants/constants';

var BrowseTile = React.createClass({
	displayName: 'BrowseTile',
	render: function() {
		var type = this.props.type;
		console.log(type);
		return (
			<div className="browse-tile flex-column overlay-container click view-trigger">
				<div className="overlay set-flex">
					<div className="browse-name center">{this.props.text}</div>
				</div>
				<img className="browse-tile-image" src={constants.S3_ROOT_FOR_IMAGES + 'small_'+this.props.image} />
			</div>
		);
	}
});

module.exports = BrowseTile;
