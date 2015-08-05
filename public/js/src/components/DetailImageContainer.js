var React = require('react');

var DetailImageContainer = React.createClass({	// Displays key detail information
	render: function() {
		return (
			<div className="flex-column flex image-container overlay-container" style={{background: "url('" + S3_ROOT_FOR_IMAGES + imageURL + "')"}}>
                <div className="overlay"></div>
                <div className="buffer"></div>
                <div className="header center artist-name">{title}</div>
                <div className="header-small center">{info}</div>
                <div className="buffer"></div>
                <div className="header-small center click" id="detail-button">{button_text}</div>
                <div className="buffer"></div>
            </div>
		);
	}
	
});

module.exports = DetailImageContainer;