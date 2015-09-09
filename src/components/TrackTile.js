import React from 'react';
import {Navigation} from 'react-router';
import constants from '../constants/constants';

var TrackTile = React.createClass({

	displayName: 'TrackTile',
	mixins: [Navigation],
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
			<div className="track-tile flex-column overlay-container click" style={image} >

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