import React from 'react';
import R from 'ramda';
import Loader from 'react-loader';

import {API_ROOT, colors} from '../constants/constants';
import ArtistTile from './ArtistTile';
import Footer from './Footer';

var artistPage = {
	background: colors.white,
	position: 'relative',
	top: '8vh'
}

var Artists = React.createClass({

	getInitialState() {
		return {
			loaded: false,
			artists: []
		};
	},

	componentWillMount() {
		this.getArtists()
		.done(res => {
			if(res.status === 'success') {
				var artists = this.filterArtists(res.payload.artists);
				this.setState({
					loaded: true,
					artists: artists
				});
			}
		});
	},

	updateArtists(res) {
		if(res.status === 'success') {
			var artists = this.filterArtists(res.payload.artists);
			this.setState({
				loaded: true,
				artists: artists
			});
		}
	},

	// changePage(e) {
	// 	var page = e.target.innerHTML.toString();
	// 	switch(page) {
	// 		case '...':
	// 			break;
	// 		case '':
	// 			this.setState((prevState, currentProps) => {
	// 				var newPage = prevState.page.currentpage++;
	// 				console.log(newPage)
	// 				this.getArtists(newPage).done(res => this.updateArtists(res));
	// 			});
	// 			break;
	// 		default:
	// 			this.getArtists(page).done(res => this.updateArtists(res));
	// 			break;
	// 	}
	// },

	filterArtists(array) {
		//	only show artists with sets
		var hasSets = set => {
			return set.set_count != 0;
		};
		return R.filter(hasSets, array);
	},

	getArtists() {
		var artistUrl = `${API_ROOT}artists`;
		return (
			$.ajax({
				url: artistUrl,
				type: 'get',
				data: {
					limit: 5000,
					property: 'artist',
					order: 'ASC',
				}
			})
		);
	},

	render() {
		var push = this.props.push;
		var tiles = this.state.artists.map((artist, index) => {
			var props = {
				artist: artist.artist,
				key: index,
				id: artist.id,
				push: push,
				imageURL: artist.icon_image.imageURL,
				set_count: artist.set_count,
				event_count: artist.event_count
			};

			return <ArtistTile {...props} />
		});

		return (
			<div style={artistPage}>
				<Loader loaded={this.state.loaded}>
					<div className='flex-row flex scrollable'>
						{tiles}
					</div>
				</Loader>
				<Footer />
			</div>
		);
	}

});

module.exports = Artists