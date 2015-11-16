import React from 'react';
import constants from '../constants/constants';
import Loader from 'react-loader';

import AlphabetScroller from './AlphabetScroller';
import ArtistTile from './ArtistTile';

var TITLE = 'Artists';
var TYPE = 'artist';
var Artists = React.createClass({

	getInitialState() {
		return {
			loaded: false
		};
	},

	componentWillMount() {
		this.getArtists()
		.done(res => {
			this.props.push({
				type: 'SHALLOW_MERGE',
				data: {
					artistBrowseData: res.payload.artist
				}
			});

			this.setState({
				loaded: true
			});
		});
	},

	getArtists() {
		var artistUrl = constants.API_ROOT + 'artist';
		return $.ajax({
			url: artistUrl,
			type: 'get'
		})
	},

	render() {
		var appState = this.props.appState.get('artistBrowseData');
		var push = this.props.push;

		var tiles = appState.map(function(artist, index) {
			var props = {
				artist: artist.artist,
				key: index,
				id: artist.id,
				push: push,
				imageURL: artist.imageURL,
				firstLetter: artist.artist[0],
				set_count: artist.set_count,
				event_count: artist.event_count
			};

			return <ArtistTile {...props} />
		});

		return (
			<Loader loaded={this.state.loaded}>
				<div className='flex-row flex view scrollable'>
					{tiles}
				</div>
			</Loader>
		);
	}

});

module.exports = Artists;