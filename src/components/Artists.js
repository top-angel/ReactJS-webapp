import React from 'react';
import constants from '../constants/constants';
import Loader from 'react-loader';
import $ from 'jquery';
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
	// componentWillMount: function() {
	// 	this.getArtists();
	// },
	componentDidMount: function() {
		this.getArtists();
		console.log($('#AlphabetScroller'));
		// $('#AlphabetScroller div').on('click', function(event) {
		// 	event.stopPropagation();
		// 	var letter = event.target.innerText;
		// 	console.log(letter);
		// 	// $('#BrowseView').scrollTo($('.browse-tile').attr(), 300);
		// });
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
			return (
				<ArtistTile key={index} dataId={artist.id} push={push} imageURL={artist.imageURL} firstLetter={artist.artist[0]}>
					{artist.artist}
				</ArtistTile>
			);
		});

		return (
			<Loader loaded={this.state.loaded}>
				<div className={containerClass}>
					{tiles}
				</div>
				<AlphabetScroller/>
			</Loader>
		);
	}

});

// <BrowseView 
// 					title={TITLE}
// 					browseClass={browseClass}
// 					data={appState}
// 					push={push}/>

module.exports = Artists;