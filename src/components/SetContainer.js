import React from 'react';
import SetTile from './SetTile';
import {checkFavorite} from '../services/favoriteSet';

var SetContainer = React.createClass({

	getDefaultProps() {
		return {
			containerClass: 'flex-row tile-container scrollable',
			sets: [],
			user: {
				favorite_set_ids: []
			}
		};
	},

	shouldComponentUpdate(nextProps, nextState) {
		var oldFav = this.props.user.favorite_set_ids;
		var newFav = nextProps.user.favorite_set_ids;

		if(nextProps.sets != this.props.sets) {
			return true;
		} else if(newFav != oldFav) {
			return true;
		} else {
			return false;
		}
	},

	render() {
		var data = this.props.sets;
		var push = this.props.push;

		var tiles = data.map((set, index) => {
			if(this.props.loginStatus) {
				var favorited = checkFavorite(set.id, this.props.user.favorite_set_ids);
			} else {
				var favorited = false;
			}

			if(set.episode != null && set.episode.length > 0) {
				var setName = `${set.event.event} - ${set.episode}`;
			} else {
				var setName = set.event.event;
			}

			var props = {
				key: index,
				id: set.id,
				artist_id: set.artists[0].id,
				event_id: set.event_id,
				is_radiomix: set.event.is_radiomix,
				set_length: set.set_length,
				push: push,
				artist: set.artists[0].artist,
				event: set.event.event,
				setName: setName,
				artistimageURL: set.artists[0].icon_image.imageURL_small,
				popularity: set.popularity,
				songURL: set.songURL,
				main_eventimageURL: set.event.icon_image.imageURL,
				timePosition: set.timePosition,
				user: this.props.user,
				loginStatus: this.props.loginStatus,
				favorited: favorited
			};

			return <SetTile {...props} />;
		});


		return (
			<div className={this.props.containerClass}>
				{tiles}
			</div>
		);
	}

});

module.exports = SetContainer;