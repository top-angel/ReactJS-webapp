import React from 'react';
import R from 'ramda';
import {checkFavorite} from '../services/favoriteSet';

import SetTile from './SetTile';

const SetContainer = React.createClass({

	contextTypes: {
		push: React.PropTypes.func,
		user: React.PropTypes.object,
		loginStatus: React.PropTypes.bool,
		favoriteSetIds: React.PropTypes.array
	},

	getDefaultProps() {
		return {
			className: 'flex-row tile-container scrollable',
			sets: []
		};
	},

// TODO add favorite_set_ids to API
	shouldComponentUpdate(nextProps, nextState, nextContext) {
		var oldFav = this.context.favoriteSetIds
		var newFav = nextContext.favoriteSetIds
		// var oldFav = this.props.appState.get('favoriteSetIds');
		// var newFav = nextProps.appState.get('favoriteSetIds');
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
		var tiles = this.props.sets.map((set, index) => {
			var favorited = this.context.loginStatus ? checkFavorite(set.id, this.context.user) : false

			// TODO TEST DIS
			if(R.keys(set.episode).length != 0) {
				var setName = `${set.event.event} - ${set.episode.episode}`;
			} else {
				var setName = set.event.event;
			}

			return React.createElement(SetTile, {
				key: index,
				id: set.id,
				eventId: set.event_id,
				isRadiomix: set.event.is_radiomix,
				setLength: set.set_length,
				artist: set.artists[0].artist,
				event: set.event.event,
				setName: setName,
				artistImage: set.artists[0].icon_image.imageURL_small,
				popularity: set.popularity,
				songUrl: set.songURL,
				bannerImage: set.event.banner_image.imageURL,
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