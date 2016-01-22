import React from 'react'
import R from 'ramda'
import {checkIfFavorited} from '../services/favoriteSet'

import BaseComponent from './BaseComponent'
import SetTile from './SetTile'

export default class SetContainer extends BaseComponent {
	constructor(props) {
		super(props)
		this.autoBind('checkIfFavorited')
	}
	checkIfFavorited(id, favorites) {
		if(this.context.loginStatus) {
			return R.contains(id, favorites)
		} else {
			return false
		}
	}
	shouldComponentUpdate(nextProps, nextState, nextContext) {
		var oldFav = this.context.favoriteSetIds
		var newFav = nextContext.favoriteSetIds
		// only update if fetching new sets from api or user favorites a set
		switch(true) {
			case nextProps.sets != this.props.sets:
				return true
			case newFav != oldFav:
				return true
			default:
				return false
				break
		}
	}
	render() {
		var tiles = this.props.sets.map((set, index) => {
			// check if each set is favorited
			var favorited = checkIfFavorited(this.context.loginStatus, set.id, this.context.favoriteSetIds)

			// show episode on set tiles
			var setName = (set.episode != undefined && R.keys(set.episode).length != 0) ? `${set.event.event} - ${set.episode.episode}` : set.event.event
			
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
		})

		return (
			<div className={this.props.className}>
				{tiles}
			</div>
		)
	}
}

SetContainer.contextTypes = {
	push: React.PropTypes.func,
	user: React.PropTypes.object,
	loginStatus: React.PropTypes.bool,
	favoriteSetIds: React.PropTypes.array
}

SetContainer.defaultProps = {
	className: 'flex-row tile-container scrollable',
	sets: []
}