import React from 'react';
import Radium from 'radium';
import R from 'ramda';
import Loader from 'react-loader';

import {API_ROOT, colors} from '../constants/constants';
import AlphabetScroller from './AlphabetScroller';
import ArtistTile from './ArtistTile';
import Footer from './Footer';
import PageSelect from './PageSelect';

var Artists = React.createClass({

	getInitialState() {
		return {
			loaded: false,
			artists: [],
			page: {}
		};
	},

	componentWillMount() {
		this.getArtists()
		.done(res => {
			if(res.status === 'success') {
				var artists = this.filterArtists(res.payload.artists);
				this.setState({
					loaded: true,
					artists: artists,
					page: res.payload.page,
					items: res.payload.page.items
				});
			}
		});
	},

	updateArtists(res) {
		if(res.status === 'success') {
			var artists = this.filterArtists(res.payload.artists);
			this.setState({
				loaded: true,
				artists: artists,
				page: res.payload.page,
				items: res.payload.page.items
			});
		}
	},

	changePage(e) {
		var page = e.target.innerHTML.toString();
		switch(page) {
			case '...':
				break;
			case '':
				this.setState((prevState, currentProps) => {
					var newPage = prevState.page.currentpage++;
					console.log(newPage)
					this.getArtists(newPage).done(res => this.updateArtists(res));
				});
				break;
			default:
				this.getArtists(page).done(res => this.updateArtists(res));
				break;
		}
	},

	filterArtists(array) {
		//	only show artists with sets
		var hasSets = set => {
			return set.set_count != 0;
		};
		return R.filter(hasSets, array);
	},

	getArtists(page=1) {
		// returns 100 artists in ascending alphabetical order by default
		var artistUrl = `${API_ROOT}artists`;
		return (
			$.ajax({
				url: artistUrl,
				type: 'get',
				data: {
					page: page,
					property: 'artist',
					order: 'ASC',
				}
			})
		);
	},

	render() {
		var push = this.props.push;
		var tiles = this.state.artists.map(function(artist, index) {
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
			<div style={{background: colors.white}}>
				<PageSelect page={this.state.page} items={this.state.items} changePage={this.changePage} />
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

module.exports = Radium(Artists);