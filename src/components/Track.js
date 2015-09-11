import React from 'react';

var Track = React.createClass({
	getDefaultProps: function() {
		return {
			className: 'track'
		};
	},
	render: function() {
		return (
			<div className={this.props.className}>
				<span className='starttime'>{this.props.starttime}</span>
				<span className='trackname'>{this.props.trackname}</span>
			</div>
		);
	}

});

module.exports = Track;