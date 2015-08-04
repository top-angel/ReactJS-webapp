var React = require('react');

var BrowseTile = React.createClass({

	render: function() {
		return (
			<div className="browse-tile flex-column overlay-container click view-trigger">
			    <div className="overlay">
			        <div className="browse-name center">{this.props.object.name}</div>
			    </div>
			    <img className="browse-tile-image" src={S3_ROOT_FOR_IMAGES + this.props.object.imageURL} />
			</div>
		);
	}

});

module.exports = BrowseTile;