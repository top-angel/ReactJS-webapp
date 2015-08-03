var React = require('react')

var PlayerSetInfo = React.createClass({
	render: function() {
		return (
			<div className="player-set-info flex-column flex-fixed">
                <div className="set-name flex">{this.props.set.artist + ' - ' + this.props.set.event}</div> 
                <div className="set-time flex">{this.props.set.set_length}</div>
            </div>
		);
	}
});


module.exports = PlayerSetInfo