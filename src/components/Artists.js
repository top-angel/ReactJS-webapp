import React from 'react';
import constants from '../constants/constants';
import Loader from 'react-loader';

import BrowseView from './BrowseView';//delete possibly
import AlphabetScroller from './AlphabetScroller';

import ArtistTile from './ArtistTile';

var TITLE = 'Artists';
var TYPE = 'artist';
var Artists = React.createClass({

	componentWillMount: function() {
		this.getArtists();
	},
	componentDidMount: function() {
		$('#AlphabetScroller div').on('click', function(event) {
			event.stopPropagation();
			var letter = event.target.innerText;
			console.log(letter);
			// $('#BrowseView').scrollTo($('.browse-tile').attr(), 300);
		});
	},
	getArtists: function() {
		var push = this.props.push;
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
		});
	},
	render: function() {
		var appState = this.props.appState.get('artistBrowseData');
		var push = this.props.push;
		var containerClass = 'flex-row flex view scrollable';

		var tiles = appState.map(function(artist, index) {
			return (
				<ArtistTile key={index} dataId={artist.id} push={push} imageURL={artist.imageURL}>
					{artist.artist}
				</ArtistTile>
			);
		});

		return (
			<div>
				<div className={containerClass}>
					{tiles}
				</div>
				<AlphabetScroller/>
			</div>
		);
	}

});

// <BrowseView 
// 					title={TITLE}
// 					browseClass={browseClass}
// 					data={appState}
// 					push={push}/>

module.exports = Artists;