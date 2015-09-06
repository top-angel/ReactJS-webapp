import React from 'react';
import constants from '../constants/constants';
import BrowseTile from './BrowseTile';
import ArtistTile from './ArtistTile';

var BrowseView = React.createClass({

	//TODO find a way to update the props received so the site stops breaking when I load different data into this view
	render: function() {
		var data = this.props.data;
		var push = this.props.push;

		var tiles = data.map(function(tile, index) {
			var text = tile.artist || tile.event || tile.activity;
			return(<BrowseTile 
				push={push}
				text={text}
				firstLetter={text[0]}
				key={index}
				dataId={tile.id}
				image={tile.imageURL}/>);
		});

		return (
			<div id='BrowseView' className={this.props.browseClass}>
				<div className='flex-column view-title-container flex'>
					<div className='center view-title'>{this.props.title}</div>
					<div className='divider'/>
				</div>
				<div className='flex-row flex'>
					{tiles}
				</div>
			</div>
		);
	}
});		

// className="view overlay-container"

module.exports = BrowseView;