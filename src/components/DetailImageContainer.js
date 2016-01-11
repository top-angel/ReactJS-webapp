import React from 'react';
import {API_ROOT, S3_ROOT_FOR_IMAGES} from '../constants/constants';

var DetailImageContainer = React.createClass({

	contextTypes: {
		push: React.PropTypes.func
	},

	getDefaultProps() {
		return {
			info: null,
			buttonText: null,
			imageURL: ''
		};
	},

	playSet(set) {
		this.context.push({
			type: 'SHALLOW_MERGE',
			data: {
				currentSet: {
					artist: set.artists[0].artist,
					event: set.event.event,
					id: set.id,
					set_length: set.set_length,
					songURL: set.songURL,
					artist_image: set.artists[0].icon_image.imageURL_small,
					starttime: '00:00'
				},
				tracklist: set.tracks,
				currentTrack: set.tracks[0].trackname,
				playing: true,
				timeElapsed: 0
			}
		})
		this.trackShuffleButton()
	},

// TODO get rid of this
	trackRecommendClick(activity) {
		mixpanel.track("Recommend Activity Clicked", {
			"activity": activity
		});
	},

	trackShuffleButton() {
		mixpanel.track("Shuffle Button Clicked");
	},

	shuffle() {
		var sets = this.props.sets
		console.log(sets)
		var random = Math.floor(Math.random() * (sets.length - 1))
		var randomSet = sets[random]
		console.log(randomSet)

		this.getSet(randomSet.id).done(res => {
			this.playSet(res.payload.sets_id)
		})
	},

	// oldShuffle() {
	// 	if(this.props.pageType == 'upcoming') {
	// 		window.open(this.props.ticketLink);
	// 	} else if(this.props.pageType == 'activity') {
	// 		this.trackRecommendClick(this.props.title);
	// 	} else {
	// 		var push = this.props.push;
	// 		var data, random, randomSet;
	// 		var self = this;

	// 		$.ajax({
	// 			type: 'get',
	// 			url: API_ROOT + 'search/' + this.props.title
	// 		})
	// 		.done(function(response) {
	// 			data = response.payload.search.sets;
	// 			random = Math.floor(Math.random() * (data.length - 1));
	// 			randomSet = data[random];
	// 			console.log(randomSet);

	// 			self.getTracklist(randomSet.id).done(res => {
	// 				var tracklist = res.payload.tracks;
	// 				var set = {
	// 					artist: randomSet.artist,
	// 					event: randomSet.event,
	// 					id: randomSet.id,
	// 					set_length: randomSet.set_length,
	// 					songURL: randomSet.songURL,
	// 					artistimageURL: randomSet.artistimageURL,
	// 					starttime: '00:00'
	// 				};

	// 				push({
	// 					type: 'SHALLOW_MERGE',
	// 					data: {
	// 						currentSet: set,
	// 						tracklist: tracklist,
	// 						currentTrack: res.payload.tracklist[0],
	// 						playing: true,
	// 					}
	// 				});

	// 				self.trackShuffleButton();
	// 			});
	// 		});
	// 	}
	// },

	getSet(id) {
		return $.ajax({
			type: 'get',
			url: `${API_ROOT}sets/id/${id}`
		})
	},

	render () {
		var image = {
			background: `url('${S3_ROOT_FOR_IMAGES+this.props.imageURL}') no-repeat`,
			backgroundSize: '100%',
			backgroundPositionY: '40%'
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

export default DetailImageContainer;