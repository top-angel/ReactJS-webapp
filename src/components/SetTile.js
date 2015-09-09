import React from 'react';
import constants from '../constants/constants';
import {Navigation, Link} from 'react-router';

var SetTile = React.createClass({

	displayName: 'SetTile',
	mixins: [Navigation],
	getDefaultProps: function() {
		return {
			starttime: 0
		};
	},
	favoriteSet: function() {
		var push = this.props.push;
		var favoriteUrl = API_ROOT + 'user/updateFavoriteSets';
		//TODO

		$.ajax({
			type: 'POST',
			url: favoriteUrl,
			data: {
				'userData': {
					'userID': 108,
					'setId': this.props.id
				}
			},
			success: function(response) {
				var registeredUser = response.payload.user;
				//TODO change class of favorite set
			}
		});
	},
	shareSet: function() {
		//TODO
	},
	playSet: function() {
		//TODO - load set into currentSet object
		var push = this.props.push;
		var setId = this.props.id;
		var songURL = this.props.songURL;
		var start
	},
	openArtistPage: function() {
		var push = this.props.push;
		var artist_id = this.props.artist_id;

		//TODO MAKE THIS WORK
		var routeString = this.props.artist.toLowerCase().split(' ').join('-');
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
		var event_id = this.props.event_id;
		console.log(this.props.is_radiomix);

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

		var eventImage = {
			backgroundImage: "url('"+constants.S3_ROOT_FOR_IMAGES + this.props.main_eventimageURL + "')"
		};
		var artistImage = constants.S3_ROOT_FOR_IMAGES+'small_'+this.props.artistimageURL;
		var routeString = this.props.artist.toLowerCase().split(' ').join('-');


		return (
			<div className='flex-column click set-tile' style={eventImage}>

				<div className='detail flex-column'>
					<div className='flex-row flex-fixed-2x'>
						<img src={artistImage} />
						<div className='flex-column flex'>
							<div className='flex link' onClick={this.openFestivalPage}>{this.props.event}</div>

							<div className='flex link' to='artist' onClick={this.openArtistPage}>{this.props.artist}</div>

	                    <div className='flex flex-row'>
								<i className='fa fa-fw fa-star-o center click link'/>
								<i className='fa fa-fw fa-share center click link'/>
	                    </div>
						</div>
					</div>
					<div className='divider center'/>
					<div className='flex-row flex-fixed'>
						<div className='flex-fixed set-flex play'>
							<i className='fa fa-play center'>{'  '+this.props.popularity}</i>
						</div>
						<div className='divider'/>
						<div className='flex-fixed set-flex'>
							<i className='fa fa-clock-o center'>{'  '+this.props.set_length}</i>
						</div>
					</div>
				</div>

			</div>
		)
	}
});

module.exports = SetTile;