import React from 'react';
import ViewTitleContainer from './ViewTitleContainer';
import constants from '../constants/constants';
import BrowseTile from './BrowseTile';

var BrowseView = React.createClass({

	componentWillUnmount: function() {
		var push = this.props.push;
		push({
			type: 'SHALLOW_MERGE',
			data: {
				browseData: {
					artists: [],
					festivals: [],
					mixes: [],
					activities: []
				}
			}
		})
	},

	render: function() {
		var tiles = [];
		var data = this.props.data;
		data.map(function(tile, index) {
			tiles.push(<BrowseTile 
				text={tile.artist || tile.event || tile.activity}
				key={index}
				image={tile.imageURL}/>);
		});


		return (
			<div id="browse" className="view overlay-container">
				<ViewTitleContainer title={this.props.title} />
				<div className="results-container flex-row flex">
					{tiles}
				</div>
			</div>
		);
	}
});		

module.exports = BrowseView;