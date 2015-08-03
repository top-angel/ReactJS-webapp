var React = require('react')

var SetTile = React.createClass({
	getDefaultProps: function() {
		return {
			set: null,
			artist: null,
			playCount: null,
			setLength: null,
			imageUrl: null
		}
	},
	handlePlay: function() {
		console.log('set playing');
	},
	render: function() {
		return (
			<div className="flex-column overlay-container set-tile">
				<img className="event-image" src={S3_ROOT_FOR_IMAGES + this.props.set.main_eventimageURL} />
			    <div className="overlay"></div>
			    <div className="buffer-4x"></div>
			    <div className="flex-column flex tile-controls">
			        <div className="flex-row flex">
			            <div className="flex-column flex overlay-container">
			                <img className="artist-image" src={this.props.set.artistimageURL} />
			            </div>
			            <div className="flex-column flex set-info">
			                <div className="center click flex">{this.props.set.set}</div>
			                <div className="center click flex">{this.props.set.artist}</div>
			                <div className="flex-row flex-2x">
			                    <i className="fa fa-fw fa-star center click flex"></i>
			                    <i className="fa fa-fw fa-share-o center click flex"></i>
			                </div>
			            </div>
			        </div>
			        <div className="divider"></div>
			        <div className="flex-row flex-2x">
			            <div className="flex-fixed set-flex play-count click tile-button" onClick={this.hanldePlay}>
			                <i className="fa fa-play center">{this.props.set.popularity}</i>
			            </div>
			            <div className="divider"></div>
			            <div className="flex-fixed set-flex set-length">
			                <i className="fa fa-clock-o center">{this.props.set.set_ength}</i>
			            </div>
			        </div>
			    </div>
			</div>
		)
	}
})

module.exports = SetTile