import React from 'react'
import R from 'ramda'
import Loader from 'react-loader'
import {colors} from '../constants/constants'
import api from '../services/api'

import Base from './Base'
import ArtistTileContainer from './ArtistTileContainer'
import ArtistTile from './ArtistTile'
import Footer from './Footer'
import Spinner from './Spinner'

var artistPage = {
	background: colors.white,
	position: 'relative',
	top: '8vh'
}

export default class Artists extends Base {
	constructor(props) {
		super(props)
		this.autoBind('fetchArtists', 'filterArtists', 'onScroll')
		this.state = {
			loaded: false,
			artists: [],
			page: 1
		}
		this.fetchArtists(this.state.page)
	}
	fetchArtists(page) {
		api.get(`artists?page=${page}`).then(res => {
			let artists = this.filterArtists(res.artists)
			artists = this.state.artists.concat(artists)

			this.setState({
				loaded: true,
				artists: artists,
				page: page + 1
			})
		})
	}
	filterArtists(array) {
		var hasSets = set => {
			return set.set_count != 0
		}
		return R.filter(hasSets, array)
	}
	onScroll() {
		this.fetchArtists(this.state.page)
	}
	render() {
		return (
			<div style={artistPage}>
				<Loader loaded={this.state.loaded}>
					<ArtistTileContainer artists={this.state.artists} onScroll={this.onScroll}/>
					<Spinner />
				</Loader>
				<Footer />
			</div>
		)
	}
}