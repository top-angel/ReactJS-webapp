import React from 'react';
import SetTile from './SetTile';

var SetContainer = React.createClass({

	render: function() {
		var data = this.props.data;
		var push = this.props.push;
		var tiles = data.map(function(set, index) {
			return(<SetTile data={set} key={index} push={push}/>);
		});
		return (
			<div className={this.props.setClass} id={this.props.containerId}>
				{tiles}
			</div>
		);
	}

});

module.exports = SetContainer;