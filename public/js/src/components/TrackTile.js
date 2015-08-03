var React = require('react')

var TrackTile = React.createClass({
	render: function() {
		return (
			<div className="track-tile flex-column flex overlay-container">
			    <div className="overlay"></div>
			    <div className="flex-column flex">
			        <div className="track-name">{this.props.track.songname}</div>
			        <div className="track-artist">{this.props.track.artistname}</div>
			        <i className="fa fa-play fa-2x click animated"></i>
			        <div className="track-time center">{this.props.track.starttime+' | '+this.props.track.set_length}</div>
			    </div>
			    <div className="tile-controls flex-column">
			        <div className="set-name click view-trigger">{this.props.track.event}</div>
			        <div className="artist-name click view-trigger">{this.props.track.artist}</div>
			    </div>
			</div>
		);
	}
})

module.exports = TrackTile