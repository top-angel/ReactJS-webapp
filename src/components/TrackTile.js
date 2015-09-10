import React from 'react';
import {Navigation} from 'react-router';
import constants from '../constants/constants';

var TrackTile = React.createClass({

	displayName: 'TrackTile',
	mixins: [Navigation],

	getTracklist: function() {
		var trackListUrl = constants.API_ROOT + 'tracklist/' + this.props.id;

		return $.ajax({
			url: trackListUrl,
			type: 'get'
		});
	},

	openArtistPage: function() {
		var push = this.props.push;
		var artist_id = this.props.artist_id;
		var routeString = this.props.artist.toLowerCase().split(' ').join('-');
		console.log(routeString);

		push({
			type: 'SHALLOW_MERGE',
			data: {
				detailId: artist_id
			}
		});

		this.transitionTo('artist');
	},

	openFestivalPage: function() {
		var push = this.props.push;
		var event_id = this.props.event_id;
		console.log(event_id);

		push({
			type: 'SHALLOW_MERGE',
			data: {
				detailId: event_id
			}
		});

		if(this.props.is_radiomix == 0) {
			this.transitionTo('festival');
		} else {
			this.transitionTo('mix');
		}
	},

	playSet: function() {
		var push = this.props.push;
		var _this = this;
		console.log(this.props.starttime);

		this.getTracklist().done(function(res) {
			var tracklist = res.payload.tracks;
			var set = {
				artist: _this.props.artist,
				event: _this.props.event,
				id: _this.props.id,
				set_length: _this.props.set_length,
				songURL: _this.props.songURL,
				artistimageURL: _this.props.artistimageURL,
				currentTrack: _this.props.trackname,
				starttime: _this.props.starttime
			};

			push({
				type: 'SHALLOW_MERGE',
				data: {
					currentSet: set,
					tracklist: tracklist
				}
			});

			_this.updatePlayCount(_this.props.id);
		});
	},

	updatePlayCount: function(id) {
		//todo get url
		$.ajax({
			type: 'POST',
			url: '/playCount',
			data: id,
			success: function(data) {
				console.log('play count updated');
			}
		});
	},

	render: function() {
		var image = {
			backgroundImage: "url('"+constants.S3_ROOT_FOR_IMAGES + 'small_' + this.props.main_eventimageURL + "')"
		};
		var artistImage = this.props.artistimageURL;
		var songname = this.props.songname;
		var artistname = this.props.artistname;
		var track = songname + ' - ' + artistname;
		var time = (this.props.starttime + ' | ' + this.props.set_length);
		var event = this.props.event;
		var artist = this.props.artist;

		return (
			<div className="track-tile flex-column overlay-container click" style={image} onClick={this.playSet} >

			    <div className='flex-row track'>
			    	<img src={constants.S3_ROOT_FOR_IMAGES + 'small_' +artistImage}/>
			    	<p className='text'>
				    	{track}
				    	<br/>
				    	{time}
			    	</p>
			    </div>

			    <div className='set flex-column'>
					<span className='artist' onClick={this.openArtistPage}>{artist}</span>
					<span className='event' onClick={this.openFestivalPage}>{event}</span>
				</div>

			</div>
		);
	}

});

// <div>{track}</div>
// 				    	<div>{time}</div>

module.exports = TrackTile;