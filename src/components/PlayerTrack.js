var React = require('react')

var PlayerTrack = React.createClass({
	render: function() {
		return (
			<div className="tracklist-item flex-row">
				<div className="center">{this.props.track.trackname}</div>
			</div>
		);
	}
});

module.exports = PlayerTrack