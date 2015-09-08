import React from 'react';
import constants from '../constants/constants';
import {Navigation, Link} from 'react-router';

var SetTile = React.createClass({

	displayName: 'SetTile',
	mixins: [Navigation],
	favoriteSet: function() {
		var push = this.props.push;
		var favoriteUrl = API_ROOT + 'user/updateFavoriteSets';
		//TODO

		// $.ajax({
		// 	type: 'POST',
		// 	url: favoriteUrl,
		// 	data: {
		// 		'userData': {
		// 			'userID': '',
		// 			'setId': ''
		// 		}
		// 	}
		// });
	},
	shareSet: function() {
		//TODO
	},
	openArtistPage: function() {
		var push = this.props.push;
		var artist_id = this.props.data.artist_id;

		//TODO MAKE THIS WORK
		var routeString = this.props.data.artist.toLowerCase().split(' ').join('-');
		console.log(routeString); //'Big Gigantic' => big-gigantic

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
		var event_id = this.props.data.event_id;
		console.log(this.props.data.is_radiomix);

		push({
			type: 'SHALLOW_MERGE',
			data: {
				detailId: event_id
			}
		});

		if(this.props.data.is_radiomix == 0) {
			this.transitionTo('festival');
		} else {
			this.transitionTo('mix');
		}
	},
	render: function() {
		var eventImage = {
			backgroundImage: "url('"+constants.S3_ROOT_FOR_IMAGES + this.props.data.main_eventimageURL + "')"
		};
		var event = this.props.data.event;
		var artist = this.props.data.artist;
		var artistImage = constants.S3_ROOT_FOR_IMAGES+'small_'+this.props.data.artistimageURL;
		var playCount = this.props.data.popularity;
		var time = this.props.data.set_length;

		var routeString = this.props.data.artist.toLowerCase().split(' ').join('-');

		var set = {
			artist: routeString
		};

		return (
			<div className='flex-column click set-tile' style={eventImage}>

				<div className='detail flex-column'>
					<div className='flex-row flex-fixed-2x'>
						<img src={artistImage} />
						<div className='flex-column flex'>
							<div className='flex link' onClick={this.openFestivalPage}>{event}</div>

							<div className='flex link' to='artist' onClick={this.openArtistPage}>{artist}</div>

	                    <div className='flex flex-row'>
								<i className='fa fa-fw fa-star-o center click link'/>
								<i className='fa fa-fw fa-share center click link'/>
	                    </div>
						</div>
					</div>
					<div className='divider center'/>
					<div className='flex-row flex-fixed'>
						<div className='flex-fixed set-flex play'>
							<i className='fa fa-play center'>{'  '+playCount}</i>
						</div>
						<div className='divider'/>
						<div className='flex-fixed set-flex'>
							<i className='fa fa-clock-o center'>{'  '+time}</i>
						</div>
					</div>
				</div>

			</div>
		)
	}
});

module.exports = SetTile;