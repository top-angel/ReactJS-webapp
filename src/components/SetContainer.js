import React from 'react';
import SetTile from './SetTile';

var SetContainer = React.createClass({

	getDefaultProps: function() {
		return {
			containerId: 'SetContainer',
			containerClass: 'flex-row tile-container',
			sets: []
		};
	},
	render: function() {
		var data = this.props.sets;
		var push = this.props.push;

		var tiles = data.map(function(set, index) {
			return(<SetTile data={set} key={index} push={push}/>);
		});


		return (
			<div className={this.props.containerClass}>
				{tiles}
			</div>
		);
	}

});

module.exports = SetContainer;