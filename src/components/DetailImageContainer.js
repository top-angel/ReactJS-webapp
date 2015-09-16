import React from 'react';
var constants = require('../constants/constants');

var DetailImageContainer = React.createClass({

	displayName: 'DetailImageContainer',
	getDefaultProps() {
		return {
			info: null,
			buttonText: null,
			pageType: undefined
		};
	},

//THIS WORKS COPY TO ANY SHUFFLE FEATURES
	shuffle() {
		if(this.props.pageType != 'upcoming') {
			var push = this.props.push;
			var data, random, randomSet;
			var _this = this;

			$.ajax({
				type: 'get',
				url: constants.API_ROOT + 'search/' + this.props.title
			})
			.done(function(response) {
				data = response.payload.search.sets;
				random = Math.floor(Math.random() * (data.length - 1));
				randomSet = data[random];
				console.log(randomSet);

				_this.getTracklist(randomSet.id).done(function(res) {
					var tracklist = res.payload.tracks;
					var set = {
						artist: randomSet.artist,
						event: randomSet.event,
						id: randomSet.id,
						set_length: randomSet.set_length,
						songURL: randomSet.songURL,
						artistimageURL: randomSet.artistimageURL,
						starttime: '00:00'
					};

					push({
						type: 'SHALLOW_MERGE',
						data: {
							currentSet: set,
							tracklist: tracklist,
							currentTrack: res.payload.tracklist[0],
							playing: true,
						}
					});
				});
			});
		} else {
			window.open(this.props.ticket_link);
		}
	},

	getTracklist(id) {
		var trackListUrl = constants.API_ROOT + 'tracklist/' + id;

		return $.ajax({
			url: trackListUrl,
			type: 'get'
		});
	},

	render () {
		var imageStyle = {
			backgroundImage: "url('" + constants.S3_ROOT_FOR_IMAGES + 'large_' + this.props.imageURL + "')"
		};

		return (
			<div className='flex-column flex image-container overlay-container' style={imageStyle}>
				<div className='overlay'/>
				<div className='buffer'/>
				<div className='header center artist-name'>{this.props.title}</div>
				<div className='header-small center'>{this.props.info}</div>
				<div className='buffer'/>
				<a className='header-small center click' id='detail-button' onClick={this.shuffle}>
					{this.props.buttonText}
				</a>
				<div className='buffer'/>
			</div>
		);
	}
	
});

module.exports = DetailImageContainer;