import React from 'react';
var constants = require('../constants/constants');

var DetailImageContainer = React.createClass({

	displayName: 'DetailImageContainer',
	getDefaultProps: function() {
		return {
			info: null,
			buttonText: null
		};
	},
	shuffleSets: function() {

	},
	render: function() {
		var imageStyle = {
				backgroundImage: "url('" + constants.S3_ROOT_FOR_IMAGES + 'large_' + this.props.imageURL + "')"
		};
		return (
			<div className="flex-column flex image-container overlay-container" style={imageStyle}>
				<div className="overlay"/>
				<div className="buffer"/>
				<div className="header center artist-name">{this.props.title}</div>
				<div className="header-small center">{this.props.info}</div>
				<div className="buffer"/>
				<div className="header-small center click" id="detail-button">
					{this.props.buttonText}
				</div>
				<div className="buffer"/>
			</div>
		);
	}
	
});

module.exports = DetailImageContainer;