var React = require('react');
var constants = require('../constants/constants');

var BrowseTile = React.createClass({

	render: function() {
		return (
			<div className="browse-tile flex-column overlay-container click view-trigger">
			    <div className="overlay set-flex">
			        <div className="browse-name center">{this.props.data.artist}</div>
			    </div>
			    <img className="browse-tile-image" src={constants.S3_ROOT_FOR_IMAGES + this.props.data.imageURL} />
			</div>
		);
	}

});

module.exports = BrowseTile;