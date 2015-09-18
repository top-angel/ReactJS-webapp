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
		var _this = this;

		//TODO check if user.favorite_set_ids == set.id
		var tiles = data.map(function(set, index) {
			var props = {
				key: index,
				id: set.id,
				artist_id: set.artist_id,
				event_id: set.event_id,
				is_radiomix: set.is_radiomix,
				set_length: set.set_length,
				push: push,
				appState: _this.props.appState,
				artist: set.artist,
				event: set.event,
				artistimageURL: set.artistimageURL,
				popularity: set.popularity,
				songURL: set.songURL,
				main_eventimageURL: set.main_eventimageURL,
				timePosition: set.timePosition
			};

			return(<SetTile {...props} />);
		});


		return (
			<div className={this.props.containerClass}>
				{tiles}
			</div>
		);
	}

});

module.exports = SetContainer;