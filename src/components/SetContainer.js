import React, {PropTypes} from 'react';
import R from 'ramda';
import {checkIfFavorited} from '../services/favoriteSet';

import Base from './Base';
import SetTile from './SetTile';
import InfiniteScrollify from './InfiniteScrollify';

class SetContainer extends Base {
	constructor(props) {
		super(props)
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
			let favorited = this.context.loginStatus ? checkIfFavorited(set.id, this.context.favoriteSetIds) : false
			// show episode on set tiles
			var setName = (set.episode != undefined && R.keys(set.episode).length != 0) ? `${set.event.event} - ${set.episode.episode}` : set.event.event
			var bannerImage = (set.icon_image && set.icon_image.imageURL) ? set.icon_image.imageURL : set.event.banner_image.imageURL;
			
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
				bannerImage: bannerImage,
				favorited: favorited
			})
		})

		return (
			<div className='tile-container'>
				{tiles}
			</div>
		)
	}
}

SetContainer.contextTypes = {
	push: PropTypes.func,
	user: PropTypes.object,
	loginStatus: PropTypes.bool,
	favoriteSetIds: PropTypes.array
}

SetContainer.defaultProps = {
	sets: []
}

SetContainer.propTypes = {
	sets: PropTypes.array.isRequired,
	onScroll: PropTypes.func
}


export default InfiniteScrollify(SetContainer);