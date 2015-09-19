import React from 'react';
import SetTile from './SetTile';
import favoriteSet from '../services/favoriteSet';

var SetContainer = React.createClass({

	getDefaultProps: function() {
		return {
			containerClass: 'flex-row tile-container',
			sets: [],
			user: {
				favorite_set_ids: []
			}
		};
	},

	render: function() {
		var data = this.props.sets;
		var push = this.props.push;
		var _this = this;

		var tiles = data.map(function(set, index) {
			if(_this.props.loginStatus) {
				var favorited = favoriteSet.favoriteSet(set.id, _this.props.user.favorite_set_ids);
			} else {
				var favorited = false;
			}
			console.log(favorited);

			var props = {
				key: index,
				id: set.id,
				artist_id: set.artist_id,
				event_id: set.event_id,
				is_radiomix: set.is_radiomix,
				set_length: set.set_length,
				push: push,
				artist: set.artist,
				event: set.event,
				artistimageURL: set.artistimageURL,
				popularity: set.popularity,
				songURL: set.songURL,
				main_eventimageURL: set.main_eventimageURL,
				timePosition: set.timePosition,
				user: _this.props.user,
				loginStatus: _this.props.loginStatus,
				favorited: favorited
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