var React = require('react')

var PlayerControl = React.createClass({
	getInitialState: function() {
		return {
			playing: false, 
		};
	},
	togglePlay: function() {
		this.setState({
			playing: !this.state.playing
		});
	},
	populatePlayer: function() {
		if(this.state.playing) {

		}
	},
	render: function() {
		return (
			<div className="player-image-container overlay-container click" onClick={this.togglePlay}>
		        <div className="overlay set-flex">
		            <i className={this.state.playing ? "fa fa-pause center" : "fa fa-play center"} id="play-button"></i>
		        </div>
		        <img />
		    </div>
		);
	}
});

module.exports = PlayerControl