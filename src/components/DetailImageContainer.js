import React from 'react';
var constants = require('../constants/constants');

var DetailImageContainer = React.createClass({

	displayName: 'DetailImageContainer',
	getDefaultProps() {
		return {
			info: null,
			buttonText: null
		};
	},

	trackRecommendClick(activity) {
		mixpanel.track("Recommend Activity Clicked", {
			"activity": activity
		});
	},

	trackShuffleButton() {
		mixpanel.track("Shuffle Button Clicked");
	},

	shuffle() {
		if(this.props.pageType == 'upcoming') {
			window.open(this.props.ticketLink);
		} else if(this.props.pageType == 'activity') {
			this.trackRecommendClick(this.props.title);
		} else {
			var push = this.props.push;
			var data, random, randomSet;
			var self = this;

			$.ajax({
				type: 'get',
				url: constants.API_ROOT + 'search/' + this.props.title
			})
			.done(function(response) {
				data = response.payload.search.sets;
				random = Math.floor(Math.random() * (data.length - 1));
				randomSet = data[random];
				console.log(randomSet);

				self.getTracklist(randomSet.id).done(function(res) {
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

					self.trackShuffleButton();
				});
			});
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
				<h1 className='header center artist-name'>{this.props.title}</h1>
				<div className='header-small center'>{this.props.info}</div>
				<a className='header-small center click' id='detail-button' onClick={this.shuffle}>
					{this.props.buttonText}
				</a>
			</div>
		);
	}
	
});

module.exports = DetailImageContainer;