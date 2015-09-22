import React from 'react';
import {History} from 'react-router';
import constants from '../constants/constants';
import convert from '../services/convert';

var TrackTile = React.createClass({

	displayName: 'TrackTile',
	mixins: [History],

	getTracklist: function() {
		var trackListUrl = constants.API_ROOT + 'tracklist/' + this.props.id;

		return $.ajax({
			url: trackListUrl,
			type: 'get'
		});
	},

	openArtistPage: function() {
		var routePath = this.props.artist.split(' ').join('_');
		this.history.pushState(null, '/artist/' + routePath);
	},

	openFestivalPage: function() {
		var routePath = this.props.event.split(' ').join('-');

		if(this.props.is_radiomix == 0) {
			//go to festival page
			this.history.pushState(null, '/festival/' + routePath);
		} else {
			//TODO GET API ROUTES FOR MIX
			var routeId = this.props.id;//quick fix for now
			this.history.pushState(null, '/mix/' + routeId);
		}
	},


	playSet: function() {
		var push = this.props.push;
		var _this = this;

		this.getTracklist().done(function(res) {
			var tracklist = res.payload.tracks;
			var set = {
				artist: _this.props.artist,
				event: _this.props.event,
				id: _this.props.id,
				set_length: _this.props.set_length,
				songURL: _this.props.songURL,
				artistimageURL: _this.props.artistimageURL,
				starttime: _this.props.starttime
			};

			console.log(set.starttime);

			push({
				type: 'SHALLOW_MERGE',
				data: {
					currentSet: set,
					tracklist: tracklist,
					currentTrack: _this.props.trackname
				}
			});

			window.history.replaceState(null, null, 'play/' + _this.props.id);
			_this.updatePlayCount(_this.props.id);
		});
	},

	updatePlayCount: function(id) {
		$.ajax({
			type: 'POST',
			url: constants.API_ROOT + 'playCount',
			data: {
				id: id
			},
			success: function(data) {
				console.log('play count updated');
			}
		});
	},

	render: function() {
		var image = {
			backgroundImage: "url('"+constants.S3_ROOT_FOR_IMAGES + this.props.main_eventimageURL + "')"
		};
		var artistImage = this.props.artistimageURL;
		var songname = this.props.songname;
		var artistname = this.props.artistname;
		var track = songname + ' - ' + artistname;
		var time = this.props.starttime + ' | ' + this.props.set_length;

		return (
			<div className="track-tile flex-column overlay-container click" style={image} >

			    <div className='flex-row track'>
			    	<img src={constants.S3_ROOT_FOR_IMAGES + 'small_' +artistImage} onClick={this.playSet} />
			    	<p className='text'>
				    	{track}
				    	<br/>
				    	{time}
			    	</p>
			    </div>

			    <div className='set flex-column'>
					<span className='artist' onClick={this.openArtistPage}>{this.props.artist}</span>
					<span className='event' onClick={this.openFestivalPage}>{this.props.event}</span>
				</div>

			</div>
		);
	}

});

module.exports = TrackTile;