var React = require('react')

var PlayerTrackInfo = React.createClass({
	render: function() {
		return (
			<div className="player-track-info flex-row flex-fixed">
                <div className="current-track center flex">{this.props.track.trackname}</div>
                <i className="fa fa-fw fa-bars click flex-zero"></i>
                <i className="fa fa-fw fa-share click flex-zero"></i>
            </div>
		);
	}
});

module.exports = PlayerTrackInfo