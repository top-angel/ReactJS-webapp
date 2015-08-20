var React = require('react')
var PlayerControl = require('./PlayerControl')
var PlayerSeek = require('./PlayerSeek')
var PlayerSetInfo = require('./PlayerSetInfo')
var PlayerTrackInfo = require('./PlayerTrackInfo')

var Player = React.createClass({
	getInitialState: function() {
		return {
			playing: false,
			hidden: true,
			currentPosition: 0,
			currentTime: "00:00"
		}
	},
	render: function() {
		return (
			<div className="player flex-row hidden">
			    <PlayerControl />
			    <div className="flex-column flex">
			        <PlayerSeek />
			        <div className="flex-row flex">
			            <PlayerSetInfo set={this.props.set}/>
			            <PlayerTrackInfo track={this.props.set}/>
			        </div>
			    </div>
			</div>
		);
	}
});

module.exports = Player