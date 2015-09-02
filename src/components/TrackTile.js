import React from 'react';
import constants from '../constants/constants';

var TrackTile = React.createClass({
	render: function() {
		var image = {
			backgroundImage: "url('"+constants.S3_ROOT_FOR_IMAGES + 'small_' + this.props.data.main_eventimageURL + "')"
		}
		var artistImage = this.props.data.artistimageURL;
		var songname = this.props.data.songname;
		var artistname = this.props.data.artistname;
		var track = artistname + ' - ' + songname;
		var time = (this.props.data.starttime + ' | ' + this.props.data.set_length);
		var event = this.props.data.event;
		var artist = this.props.data.artist;

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
					<span className='artist'>{artist}</span>
					<span className='event'>{event}</span>
				</div>

			</div>
		);
	}
});

// <div>{track}</div>
// 				    	<div>{time}</div>

module.exports = TrackTile;