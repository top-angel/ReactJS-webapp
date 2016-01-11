import React from 'react';
import R from 'ramda';
import {checkFavorite} from '../services/favoriteSet';

import SetTile from './SetTile';

const SetContainer = React.createClass({

	getDefaultProps() {
		return {
			className: 'flex-row tile-container scrollable',
			sets: [],
			user: {
				favorite_set_ids: []
			}
		};
	},

// TODO add favorite_set_ids to API
	shouldComponentUpdate(nextProps, nextState) {
		var oldFav = this.props.user.favorite_set_ids;
		var newFav = nextProps.user.favorite_set_ids;
		// if(nextProps.sets != this.props.sets) {
		// 	return true;
		// } else if(newFav != oldFav) {
		// 	return true;
		// } else {
		// 	return false;
		// }
		switch(true) {
			case nextProps.sets != this.props.sets:
				return true;
				break;
			case newFav != oldFav:
				return true;
				break;
			default:
				return false;
				break;
		}
	},

	render() {
		var sets = this.props.sets
		var tiles = sets.map((set, index) => {
			var favorited = this.props.loginStatus ? checkFavorite(set.id, this.props.user) : false
			// if(R.keys(set.episode).length != 0) {
			if(set.episode) {
				var setName = `${set.event.event} - ${set.episode.episode}`;
			} else {
				var setName = set.event.event;
			}

			return React.createElement(SetTile, {
				key: index,
				id: set.id,
				artist_id: set.artists[0].id,
				event_id: set.event_id,
				is_radiomix: set.event.is_radiomix,
				set_length: set.set_length,
				artist: set.artists[0].artist,
				event: set.event.event,
				setName: setName,
				artist_image: set.artists[0].icon_image.imageURL_small,
				popularity: set.popularity,
				songURL: set.songURL,
				banner_image: set.event.banner_image.imageURL,
				// user: this.props.user,
				// loginStatus: this.props.loginStatus,
				favorited: favorited
			})
		});

		return (
			<div className={this.props.className}>
				{tiles}
			</div>
		);
	}

});

export default SetContainer;