import React from 'react';
import {API_ROOT, S3_ROOT_FOR_IMAGES} from '../constants/constants';
import convert from '../services/convert';
import history from '../services/history';

var TrackTile = React.createClass({

	getSetInfo() {
		return $.ajax({
			url: `${API_ROOT}sets/id/${this.props.id}`,
			type: 'get'
		})
	},

	openArtistPage(e) {
		e.stopPropagation();
		var routePath = this.props.artist.split(' ').join('_');
		history.pushState(null, `/artist/${routePath}`);
		mixpanel.track("Artist Clicked", {
			"Artist": this.props.artist
		});
	},

	openFestivalPage(e) {
		if(this.props.is_radiomix == 0) {
			history.pushState(null, `/festival/${this.props.id}`);
		} else {
			var routeId = this.props.id;
			history.pushState(null, `/mix/${this.props.id}`);
		}
	},

	playSet() {
		var push = this.props.push;
		this.getTracklist().done(res => {
			var tracklist = res.payload.tracks;
			var set = {
				artist: this.props.artist,
				event: this.props.event,
				id: this.props.id,
				set_length: this.props.set_length,
				songURL: this.props.songURL,
				artist_image: this.props.artist_image,
				starttime: this.props.starttime
			};

			push({
				type: 'SHALLOW_MERGE',
				data: {
					currentSet: set,
					tracklist: tracklist,
					currentTrack: this.props.trackname
				}
			});

			this.updatePlayCount(this.props.id);
			this.trackPlay();
		});
	},

	updatePlayCount(id) {
		$.ajax({
			type: 'POST',
			url: API_ROOT + 'playCount',
			data: {
				id: id
			},
			success(data) {
				console.log('play count updated');
			}
		});
	},

	trackPlay() {
		mixpanel.track("Track Played", {
			"Track Artist": this.props.artistname,
			"Track Name": this.props.trackname,
			"Set Artist": this.props.artist,
			"Event": this.props.event
		});
	},

	render() {
		var image = {
			backgroundImage: `url('${S3_ROOT_FOR_IMAGES+this.props.banner_image}')`
		};
		// var track = `${this.props.songname} - ${this.props.artistname}`;
		var time = `${this.props.starttime} | ${this.props.set_length}`;

		return (
			<div className='track-tile flex-column click' style={image} onClick={this.playSet} >
			    <div className='flex-row track'>
			    	<img src={S3_ROOT_FOR_IMAGES+this.props.artist_image} />
			    	<p className='text'>
				    	{this.props.trackname}
				    	<br/>
				    	{time}
			    	</p>
			    </div>
			    <i className='fa fa-play'/>
			    <div className='set flex-column'>
					<span className='artist' onClick={this.openArtistPage}>{this.props.artist}</span>
					<span className='event' onClick={this.openFestivalPage}>{this.props.event}</span>
				</div>
			</div>
		);
	}

});

module.exports = TrackTile;