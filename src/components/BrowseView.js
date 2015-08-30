import React from 'react';
import constants from '../constants/constants';
import BrowseTile from './BrowseTile';

var BrowseView = React.createClass({

	//TODO find a way to update the props received so the site stops breaking when I load different data into this view
	render: function() {
		var data = this.props.data;
		var push = this.props.push;

		var tiles = data.map(function(tile, index) {
			return(<BrowseTile 
				push={push}
				text={tile.artist || tile.event || tile.activity}
				key={index}
				dataId={tile.id}
				image={tile.imageURL}/>);
		});

		return (
			<div id="browse" className="view overlay-container">
				<div className="flex-column view-title-container flex-zero">
					<div className="center view-title">{this.props.title}</div>
					<div className="divider"></div>
				</div>
				<div className="results-container flex-row flex">
					{tiles}
				</div>
			</div>
		);
	}
});		

module.exports = BrowseView;