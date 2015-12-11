import React from 'react';
import {API_ROOT, S3_ROOT_FOR_IMAGES} from '../constants/constants';

var DetailImageContainer = React.createClass({

	getDefaultProps() {
		return {
			info: null,
			buttonText: null,
			imageURL: ''
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
				url: API_ROOT + 'search/' + this.props.title
			})
			.done(function(response) {
				data = response.payload.search.sets;
				random = Math.floor(Math.random() * (data.length - 1));
				randomSet = data[random];
				console.log(randomSet);

				self.getTracklist(randomSet.id).done(res => {
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
		var trackListUrl = API_ROOT + 'tracklist/' + id;

		return $.ajax({
			url: trackListUrl,
			type: 'get'
		});
	},

	render () {
		var image = {
			background: `url('${S3_ROOT_FOR_IMAGES+this.props.imageURL}')`
		}

		return (
			<div className='flex-column detail-header' style={image}>
				<h1 className='center'>{this.props.title}</h1>
				<h3 className='center'>{this.props.info}</h3>
				<a id='detail-button' onClick={this.shuffle}>
					{this.props.buttonText}
				</a>
			</div>
		);
	}
	
});

module.exports = DetailImageContainer;