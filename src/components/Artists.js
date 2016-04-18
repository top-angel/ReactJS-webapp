import React, {PropTypes} from 'react';
import R from 'ramda';
import Loader from 'react-loader';
import api from '../services/api';
import {filterWithoutSets} from '../services/utilities';

import Base from './Base';
import ArtistTileContainer from './ArtistTileContainer';
import Footer from './Footer';
import Spinner from './Spinner';

export default class Artists extends Base {
	constructor(props) {
		super(props);
		this.autoBind('fetchArtists', 'onScroll');
		this.state = {
			loaded: false,
			artists: [],
			page: 1
		};
		this.fetchArtists(this.state.page);
	}
	componentWillMount() {
		this.context.push({ currentPage: 'Artists' });	
	}
	fetchArtists(page) {
		api.get(`artists?page=${page}`).then(payload => {
			let artists = filterWithoutSets(payload.artists);
			artists = this.state.artists.concat(artists);
			artists = R.uniq(artists);

			this.setState({
				loaded: true,
				artists: artists,
				page: page + 1
			});
		});
	}
	onScroll() {
		this.fetchArtists(this.state.page);
	}
	render() {
		return (
			<div className='artists'>
				<Loader loaded={this.state.loaded}>
					<ArtistTileContainer artists={this.state.artists} onScroll={this.onScroll}/>
					<Spinner />
				</Loader>
				<Footer />
			</div>
		);
	}
}

Artists.contextTypes = {
	push: PropTypes.func
};