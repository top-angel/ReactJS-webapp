import React from 'react';
import constants from '../constants/constants';
import Loader from 'react-loader';

import BrowseView from './BrowseView';//delete possibly
import AlphabetScroller from './AlphabetScroller';

import ArtistTile from './ArtistTile';

var TITLE = 'Artists';
var TYPE = 'artist';
var Artists = React.createClass({

	getInitialState: function() {
		return {
			loaded: false
		};
	},
	componentWillMount: function() {
		this.getArtists();
	},
	getArtists: function() {
		var push = this.props.push;
		var _this = this;
		var results,
			artistUrl = constants.API_ROOT + 'artist';

		$.ajax({
			url: artistUrl,
			type: 'get'
		})
		.done(function(response) {
			results = response.payload.artist;
			push({
				type: 'SHALLOW_MERGE',
				data: {
					artistBrowseData: results
				}
			});

			_this.setState({
				loaded: true
			});
		});
	},
	render: function() {
		var appState = this.props.appState.get('artistBrowseData');
		var push = this.props.push;
		var containerClass = 'flex-row flex view overlay-container scrollable';

		var tiles = appState.map(function(artist, index) {
			var props = {
				artist: artist.artist,
				key: index,
				id: artist.id,
				push: push,
				imageURL: artist.imageURL,
				firstLetter: artist.artist[0]
			};

			return <ArtistTile {...props} />
		});

		return (
			<Loader loaded={this.state.loaded}>
				<div className={containerClass}>
					{tiles}
				</div>
			</Loader>
		);
	}

});

module.exports = Artists;